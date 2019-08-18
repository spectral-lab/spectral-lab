// @flow
import { BaseModel, Note } from '.';
import { NOTE_ON } from '../../../constants/model-types';
import { makeMandatory } from '../utils';

export default class NoteOn extends BaseModel {
  static get entity () {
    return 'noteOns';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      noteId: this.attr(null),
      type: this.string(NOTE_ON),
      noteOnVelocity: this.number(0.5), // from 0.0 to 1.0.
      pitchBend: this.number(0), // in midi note number. Negative float is acceptable.
      timbre: this.number(0.5), // from 0.0 to 1.0.
      pressure: this.number(0.5), // from 0.0 to 1.0.
      selected: this.boolean(false)
    };
  }

  get parent () {
    return Note.query().whereId(this.noteId).first();
  }
}
