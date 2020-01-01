// @flow
import { BaseModel, Clip, NoteOn, NoteOff, Modulation } from './index';
import { NOTE } from '../../constants/model-types';
import { makeMandatory } from '../store/utils';
import { pitchTransition } from '../utils/helpers/transition';

export default class Note extends BaseModel {
  static get entity () {
    return 'notes';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(NOTE),
      clipId: this.attr(null, makeMandatory('clipId')),
      noteNumber: this.number(60),
      offsetTime: this.number(0), // in tick
      noteOn: this.hasOne(NoteOn, 'noteId'),
      noteOff: this.hasOne(NoteOff, 'noteId'),
      modulations: this.hasMany(Modulation, 'noteId'),
      selected: this.boolean(false),
      interpolation: this.string('LINEAR')
    };
  }

  get noteActions () {
    return [
      this.noteOn,
      ...this.modulations,
      this.noteOff
    ];
  }

  get pitchTransition () {
    return pitchTransition(this);
  }

  get parent () {
    return Clip.query().whereId(this.clipId).first();
  }
}
