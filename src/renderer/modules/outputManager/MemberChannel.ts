import { NOTE_ON, MODULATION, NOTE_OFF } from '../../../constants/model-types';
import {
  noteOffMessage, noteOnMessage, pitchBendMessage, channelPressureMessage, cc74Message
} from '../midi/formatMidiMessage';
import { PITCH_BEND, PRESSURE, TIMBRE } from '../../../constants/modulation-types';
import { pick } from 'lodash';
// eslint-disable-next-line no-unused-vars
import { NoteOn, NoteOff, Modulation } from '../../store/models';
// eslint-disable-next-line no-unused-vars
import { MidiMessage, Now, NoteAction } from '../../typedef';

export default class MemberChannel {
  public pitchBendRange: number;

  private _now: Now;

  private _timeOfLastNoteOff: number;

  private _timeOfLastNoteOn: number;

  private _activeNoteOn: NoteOn | null;

  private _midiChannel: number;

  /**
   * @param  {object} param
   * @param  {number} param._midiChannel Integer from 1 to 16
   * @param  {Now}
   */
  constructor ({ midiChannel, nowCb, pitchBendRange = 48 }: { midiChannel: number, nowCb: Now, pitchBendRange?: number }) {
    this._now = nowCb;
    this._timeOfLastNoteOff = this._now();
    this._timeOfLastNoteOn = this._now();
    this._activeNoteOn = null;
    this._midiChannel = midiChannel;
    this.pitchBendRange = pitchBendRange;
  };

  public noteOn (noteOn: NoteOn) {
    if (this.isOccupied) {
      return [...this.buildNoteOffMessages({}), ...this.buildNoteOnRelatedMessages(noteOn)];
    }
    return this.buildNoteOnRelatedMessages(noteOn);
  }

  public modulate (modulation: Modulation) {
    if (this.isOccupied) {
      return this.buildModulationMessages(modulation);
    }
    return [];
  }

  public noteOff (noteOff: NoteOff) {
    if (this.isOccupied) {
      return this.buildNoteOffMessages(noteOff);
    }
    return [];
  }

  get midiChannel () {
    return this._midiChannel;
  }

  get timeOfLastNoteOff () {
    return this._timeOfLastNoteOff;
  }

  get timeOfLastNoteOn () {
    return this._timeOfLastNoteOn;
  }

  get isOccupied (): boolean {
    return Boolean(this._activeNoteOn);
  }

  private buildNoteOffMessages (noteOff: NoteOff): [MidiMessage] {
    const noteOffVelocity = noteOff.noteOffVelocity || 0;
    const ret = noteOffMessage(this._activeNoteOn.parent.noteNumber, noteOffVelocity, this._midiChannel);
    this._timeOfLastNoteOff = this._now();
    this._activeNoteOn = null;
    return [ret];
  };

  private buildNoteOnRelatedMessages (noteOn: NoteOn): MidiMessage[] {
    this._activeNoteOn = noteOn;
    this._timeOfLastNoteOn = this._now();
    return [
      cc74Message(noteOn.timbre, this._midiChannel),
      channelPressureMessage(noteOn.pressure, this._midiChannel),
      pitchBendMessage(noteOn.pitchBend, this.pitchBendRange, this._midiChannel),
      noteOnMessage(noteOn.parent.noteNumber, noteOn.noteOnVelocity, this._midiChannel)
    ];
  }

  private buildModulationMessages (modulation: Modulation): MidiMessage[] {
    return Object.keys(pick(modulation, [PITCH_BEND, PRESSURE, TIMBRE]))
      .filter(key => modulation[key] !== null)
      .reduce((messages: MidiMessage[], key: PITCH_BEND | PRESSURE | TIMBRE) => {
        switch (key) {
          case PITCH_BEND:
            return [...messages, pitchBendMessage(modulation.pitchBend, this.pitchBendRange, this._midiChannel)];
          case PRESSURE:
            return [...messages, channelPressureMessage(modulation.pressure, this._midiChannel)];
          case TIMBRE:
            return [...messages, cc74Message(modulation.timbre, this._midiChannel)];
          default: return messages;
        }
      }, []);
  }
}
