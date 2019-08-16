// @flow
import { BaseModel, Clip, NoteOn, NoteOff, Modulation } from '.';
import { NOTE } from '../../../constants/model-types';
import { makeMandatory } from '../utils';

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
    const pitchBendMods = this.modulations.filter(mod => mod.pitchBend !== null);
    const noteActions = [{ offsetTime: 0, ...this.noteOn }, ...pitchBendMods, this.noteOff && this.noteOff].filter(v => v);
    return noteActions.map(noteAction => ({
      offsetTime: this.offsetTime + noteAction.offsetTime,
      pitch: this.noteNumber + noteAction.pitchBend,
      id: noteAction.id,
      type: noteAction.type
    }));
  }

  get parent () {
    return Clip.query().whereId(this.clipId).first();
  }
}
