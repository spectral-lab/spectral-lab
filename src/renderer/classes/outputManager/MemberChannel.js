import '../../typedef';
import { NOTE_ON, MODULATION, NOTE_OFF } from './note-actions';
import { deriveStatusByte } from '../../utils/midi/statusByteUtils';
import * as midiMessageType from '../../utils/midi/midi-message-types';
import * as defaults from '../../constants/defaults';

class MemberChannel {
  /**
   * @param  {number} midiChannel integer from 1 to 16
   * @param  {function} nowFn function to current time. e.g. performance.now
   */
  constructor (midiChannel, nowFn) {
    this.nowFn = nowFn;
    this.timeOfLastNoteOff = nowFn();
    this.activeNoteOn = null;
    this.midiChannel = midiChannel;
  };
  /**
   * @param {string} actionType
   * @param  {NoteOn | Modulation | NoteOff } [action]
   */
  deriveMidiMessage (actionType, action) {
    this.messages = [];
    switch (actionType) {
      case NOTE_ON:
        const noteOn = Object.assign({}, defaults.NOTE_ON, action);
        if (this.isOccupied) {
          return [this.deriveNoteOffMessage(), ...this.deriveNoteOnRelatedMessages(noteOn)];
        }
        return this.deriveNoteOnRelatedMessages(noteOn);
      case MODULATION:
        if (!this.isOccupied) return [];
        // TODO
        return [];
      case NOTE_OFF:
        if (!this.isOccupied) return [];
        // TODO
        return [];
    }
  };

  isOccupied () {
    return this.activeNoteOn != null;
  }

  deriveNoteOffMessage () {
    const noteOffMessage = [
      deriveStatusByte(midiMessageType.NOTE_OFF, this.midiChannel),
      this.activeNoteOn.noteOn.noteNumber,
      0
    ];
    this.timeOfLastNoteOff = this.nowFn();
    this.activeNoteOn = null;
    return noteOffMessage;
  };

  deriveNoteOnRelatedMessages (noteOn) {
    const noteOnMessage = [
      deriveStatusByte(midiMessageType.NOTE_ON, this.midiChannel),
      noteOn.noteNumber,
      noteOn.noteOnVelocity
    ];
    this.activeNoteOn = noteOn;
    return [
      this.derivePitchBendMessage(noteOn.pitchBend),
      this.deriveChannelPressureMessage(noteOn.pressure),
      this.deriveCC74Message(noteOn.timbre),
      noteOnMessage
    ];
  }

  derivePitchBendMessage (pitchBend) {
    // TODO:
    const lsb = 0;
    const msb = 0;
    return [
      deriveStatusByte(midiMessageType.PITCH_BEND, this.midiChannel),
      lsb,
      msb
    ];
  }

  deriveCC74Message (timbre) {
    // TODO:
    const lsb = 0;
    const msb = 0;
    return [
      deriveStatusByte(midiMessageType.CONTROL_CHANGE, this.midiChannel),
      lsb,
      msb
    ];
  }

  deriveChannelPressureMessage (pressure) {
    // TODO:
    const lsb = 0;
    const msb = 0;
    return [
      deriveStatusByte(midiMessageType.CHANNEL_PRESSURE, this.midiChannel),
      lsb,
      msb
    ];
  }
};

export default MemberChannel;
