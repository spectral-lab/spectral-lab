import { NOTE_ON, MODULATION, NOTE_OFF } from '../../constants/model-types';
import {
  noteOffMessage, noteOnMessage, pitchBendMessage, channelPressureMessage, cc74Message
} from '../midi/formatMidiMessage';
import { PITCH_BEND, PRESSURE, TIMBRE } from '../../constants/modulation-types';
import { pick } from 'lodash';
// eslint-disable-next-line no-unused-vars
import { NoteOn, NoteOff, Modulation } from '../../store/models';
// eslint-disable-next-line no-unused-vars
import { MidiMessage, Now } from '../../typedef';

export default class MemberChannel {
  private _now: Now;

  private _timeOfLastNoteOff: number;

  private _timeOfLastNoteOn: number;

  private _activeNoteOn: NoteOn | null;

  private _midiChannel: number;

  private _pitchBendRange: number;

  /**
   * @param  {object} param
   * @param  {number} param._midiChannel Integer from 1 to 16
   * @param  {Now}
   */
  constructor ({ midiChannel, nowCb }: { midiChannel: number, nowCb: Now }) {
    this._now = nowCb;
    this._timeOfLastNoteOff = this._now();
    this._timeOfLastNoteOn = this._now();
    this._activeNoteOn = null;
    this._midiChannel = midiChannel;
    this._pitchBendRange = 48;
  };

  get midiChannel () {
    return this._midiChannel;
  }

  get timeOfLastNoteOff () {
    return this._timeOfLastNoteOff;
  }

  get timeOfLastNoteOn () {
    return this._timeOfLastNoteOn;
  }

  /**
   * @param  {number} [options._pitchBendRange] 0 to 96.
   */
  deriveMidiMessages (noteAction: NoteOn | Modulation | NoteOff, options: {pitchBendRange?: number} = {}) {
    if (options.pitchBendRange != null) this._pitchBendRange = options.pitchBendRange;
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

  get isOccupied (): boolean {
    return Boolean(this._activeNoteOn);
  }

  buildNoteOffMessages (noteOff: NoteOff): [MidiMessage] {
    const noteOffVelocity = noteOff.noteOffVelocity || 0;
    const ret = noteOffMessage(this._activeNoteOn.parent.noteNumber, noteOffVelocity, this._midiChannel);
    this._timeOfLastNoteOff = this._now();
    this._activeNoteOn = null;
    return [ret];
  };

  buildNoteOnRelatedMessages (noteOn: NoteOn): MidiMessage[] {
    this._activeNoteOn = noteOn;
    this._timeOfLastNoteOn = this._now();
    return [
      cc74Message(noteOn.timbre, this._midiChannel),
      channelPressureMessage(noteOn.pressure, this._midiChannel),
      pitchBendMessage(noteOn.pitchBend, this._pitchBendRange, this._midiChannel),
      noteOnMessage(noteOn.parent.noteNumber, noteOn.noteOnVelocity, this._midiChannel)
    ];
  }

  buildModulationMessages (modulation: Modulation): MidiMessage[] {
    return Object.keys(pick(modulation, [PITCH_BEND, PRESSURE, TIMBRE]))
      .filter(key => modulation[key] !== null)
      .reduce((messages: MidiMessage[], key: PITCH_BEND | PRESSURE | TIMBRE) => {
        switch (key) {
          case PITCH_BEND:
            return [...messages, pitchBendMessage(modulation.pitchBend, this._pitchBendRange, this._midiChannel)];
          case PRESSURE:
            return [...messages, channelPressureMessage(modulation.pressure, this._midiChannel)];
          case TIMBRE:
            return [...messages, cc74Message(modulation.timbre, this._midiChannel)];
          default: return messages;
        }
      }, []);
  }
}
