// @flow
import { BaseModel, Note } from './index';
import { makeMandatory } from '../utils';
import { MODULATION } from '../../../constants/model-types';

export default class Modulation extends BaseModel {
  static get entity () {
    return 'modulations';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      noteId: this.attr(null),
      type: this.string(MODULATION),
      offsetTime: this.number(1), // in tick
      pitchBend: this.number(null).nullable(), // in midi note number. Negative float is acceptable.
      pressure: this.number(null).nullable(), // from 0.0 to 1.0.
      timbre: this.number(null).nullable(), // from 0.0 to 1.0.
      selected: this.boolean(false)
    };
  }

  get parent () {
    return Note.query().whereId(this.noteId).first();
  }
}
