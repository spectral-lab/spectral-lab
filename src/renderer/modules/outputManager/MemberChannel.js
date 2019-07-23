import '../../typedef';
import { NOTE_ON, MODULATION, NOTE_OFF } from '../../constants/model-types';
import * as defaults from '../../constants/defaults';
import {
  noteOffMessage, noteOnMessage, pitchBendMessage, channelPressureMessage, cc74Message
} from '../midi/formatMidiMessage';
import { PITCH_BEND, PRESSURE, TIMBRE } from '../../constants/modulation-types';
import { pick } from 'lodash';

class MemberChannel {
  /**
   * @param  {object} param
   * @param  {number} param.midiChannel Integer from 1 to 16
   * @param  {function} param.nowCb Function to get current time. e.g.`performance.now`
   */
  constructor ({ midiChannel, nowCb }) {
    this.now = nowCb;
    this.timeOfLastNoteOff = this.now();
    this.timeOfLastNoteOn = this.now();
    this.activeNoteOn = null;
    this.midiChannel = midiChannel;
    this.pitchBendRange = 48;
  };
  /**
   * @param  {NoteOn | Modulation | NoteOff} noteAction
   * @param  {object} [options]
   * @param  {number} [options.pitchBendRange] 0 to 96.
   */
  deriveMidiMessages (noteAction, options = {}) {
    if (options.pitchBendRange != null) this.pitchBendRange = options.pitchBendRange;
    switch (noteAction.type) {
      case NOTE_ON:
        if (this.isOccupied) {
          return [...this.buildNoteOffMessages({}), ...this.buildNoteOnRelatedMessages(noteAction)];
        }
        return this.buildNoteOnRelatedMessages(noteAction);
      case MODULATION:
        if (this.isOccupied) {
          return this.buildModulationMessages(noteAction);
        }
        return [];
      case NOTE_OFF:
        if (this.isOccupied) {
          return this.buildNoteOffMessages(noteAction);
        }
        return [];
    }
    throw new Error(
      `deriveMidiMessages(${noteAction}) is invalid.\n` +
      `"type" property must be "NOTE_ON", "MODULATION" or "NOTE_OFF.`
    );
  };

  get isOccupied () {
    return Boolean(this.activeNoteOn);
  }

  buildNoteOffMessages (noteOff) {
    const noteOffVelocity = noteOff.noteOffVelocity || 0;
    const ret = noteOffMessage(this.activeNoteOn.parent.noteNumber, noteOffVelocity, this.midiChannel);
    this.timeOfLastNoteOff = this.now();
    this.activeNoteOn = null;
    return [ret];
  };

  buildNoteOnRelatedMessages (noteOn) {
    this.activeNoteOn = noteOn;
    this.timeOfLastNoteOn = this.now();
    return [
      cc74Message(noteOn.timbre, this.midiChannel),
      channelPressureMessage(noteOn.pressure, this.midiChannel),
      pitchBendMessage(noteOn.pitchBend, this.pitchBendRange, this.midiChannel),
      noteOnMessage(noteOn.parent.noteNumber, noteOn.noteOnVelocity, this.midiChannel)
    ];
  }

  buildModulationMessages (modulation) {
    return Object.keys(pick(modulation, [PITCH_BEND, PRESSURE, TIMBRE])).reduce((messages, key) => {
      switch (key) {
        case PITCH_BEND:
          return [...messages, pitchBendMessage(modulation.pitchBend, this.pitchBendRange, this.midiChannel)];
        case PRESSURE:
          return [...messages, channelPressureMessage(modulation.pressure, this.midiChannel)];
        case TIMBRE:
          return [...messages, cc74Message(modulation.timbre, this.midiChannel)];
      }
    }, []);
  }
}

export default MemberChannel;
