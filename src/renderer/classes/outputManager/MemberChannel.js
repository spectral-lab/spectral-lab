import '../../typedef';
import { NOTE_ON, MODULATION, NOTE_OFF } from './note-actions';
import * as defaults from '../../constants/defaults';
import {
  noteOffMessage, noteOnMessage, pitchBendMessage, channelPressureMessage, cc74Message
} from '../../utils/midi/formatMidiMessage';
import { PITCH_BEND, PRESSURE, TIMBRE } from './modulation-types';
import { pick } from 'lodash';

class MemberChannel {
  /**
   * @param  {object} param
   * @param  {number} param.midiChannel Integer from 1 to 16
   * @param  {function} param.nowFn Function to get current time. e.g.`performance.now`
   */
  constructor ({ midiChannel, nowFn }) {
    this.nowFn = nowFn;
    this.timeOfLastNoteOff = nowFn();
    this.activeNoteOn = null;
    this.midiChannel = midiChannel;
    this.pitchBendRange = 48;
  };
  /**
   * @param  {NoteOn | Modulation | NoteOff } noteAction
   * @param  {object} [options]
   * @param  {number} [options.pitchBendRange] 0 to 96.
   */
  deriveMidiMessage (noteAction, options = {}) {
    if (options.pitchBendRange != null) this.pitchBendRange = options.pitchBendRange;
    switch (noteAction.type) {
      case NOTE_ON:
        const noteOn = Object.assign({}, defaults.NOTE_ON, noteAction);
        if (this.isOccupied) {
          return [this.buildNoteOffMessage(), ...this.buildNoteOnRelatedMessages(noteOn)];
        }
        return this.buildNoteOnRelatedMessages(noteOn);
      case MODULATION:
        if (this.isOccupied) {
          // TODO: force bend option (replace existing note with new one)
          // TODO
          return [];
        }
        return [];
      case NOTE_OFF:
        if (this.isOccupied) {
          // TODO
          return [];
        }
        return [];
    }
    throw new Error(
      `deriveMidiMessage(${noteAction}) is invalid.\n` +
      `"type" property must be "NOTE_ON", "MODULATION" or "NOTE_OFF.`
    );
  };

  isOccupied () {
    return this.activeNoteOn != null;
  }

  buildNoteOffMessage (noteOff = { noteOffVelocity: 0 }) {
    const noteOffVelocity = noteOff.noteOffVelocity || 0;
    const ret = noteOffMessage(this.activeNoteOn.noteNumber, noteOffVelocity, this.midiChannel);
    this.timeOfLastNoteOff = this.nowFn();
    this.activeNoteOn = null;
    return ret;
  };
  /**
   * @param  {NoteOn} noteOn
   */
  buildNoteOnRelatedMessages (noteOn) {
    this.activeNoteOn = noteOn;
    return [
      pitchBendMessage(noteOn.pitchBend, this.pitchBendRange, this.midiChannel),
      channelPressureMessage(noteOn.pressure, this.midiChannel),
      cc74Message(noteOn.timbre, this.midiChannel),
      noteOnMessage(noteOn.noteNumber, noteOn.noteOnVelocity, this.midiChannel)
    ];
  }
  /**
   * @param  {Modulation} modulation
   */
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
