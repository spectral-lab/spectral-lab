import * as defaults from '../constants/defaults';
import { NOTE_ON } from '../constants/note-action-types';
import { pick } from 'lodash';
import '../typedef';

const noteOnProperties = Object.keys(defaults.noteOn);

class NoteFactory {
  constructor () {
    this.id = 0;
  }
  /**
   * @param {object} materials
   * @returns {Note}
   */
  createNote (materials) {
    // pitch = noteNumber + pitchBend
    if (materials.time != null && materials.pitch != null) return this.noteFromPitch(materials);
    if (materials.time != null && materials.noteNumber != null) return this.noteFromNoteNumber(materials);
    throw new Error('To create note, either (time and pitch) or (time and noteNumber) is necessary');
  }
  noteFromPitch (materials) {
    const noteNumber = Math.round(materials.pitch);
    const pitchBend = materials.pitch - noteNumber;
    const noteOn = Object.assign(
      {},
      defaults.noteOn,
      pick(materials, noteOnProperties),
      { noteNumber, pitchBend },
      { type: NOTE_ON }
    );
    const note = {
      id: this.id,
      noteOn,
      noteOff: null,
      modulations: []
    };
    this.id++;
    return note;
  }
  noteFromNoteNumber (materials) {
    const noteOn = Object.assign(
      {},
      defaults.noteOn,
      pick(materials, noteOnProperties),
      { type: NOTE_ON }
    );
    const note = {
      id: this.id,
      noteOff: null,
      noteOn,
      modulations: []
    };
    return note;
  }
}

export default NoteFactory;
