import { makeMandatory } from '../utils';
import { CLIP } from '../../../constants/model-types';
import { beatsPerBar, ticksPerBeat } from '../../../constants/defaults';
import { SCALE_COLORS } from '../../../constants/colors';
import { random, flatten, sortBy } from 'lodash';
import { AudioBuffer, BaseModel, Track, Note } from '.';

export default class Clip extends BaseModel {
  static get entity () {
    return 'clips';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(CLIP),
      name: this.attr(null),
      offsetTime: this.number(0), // in tick
      duration: this.number(4 * beatsPerBar * ticksPerBeat), // in tick. default is 4 bars
      notes: this.hasMany(Note, 'clipId'),
      audioBuffer: this.hasOne(AudioBuffer, 'clipId'),
      beatsPerBar: this.attr([{ barIdx: 0, val: beatsPerBar }]),
      selected: this.boolean(false),
      trackId: this.attr(null),
      color: this.attr(() => SCALE_COLORS.hHelmholtz[random(11)])
    };
  };

  get parent () {
    return Track.query().whereId(this.trackId).first();
  }

  get startTime () {
    return this.absoluteTime;
  }

  get endTime () {
    return this.absoluteTime + this.duration;
  }

  get selectedNoteIds () {
    return this.notes.filter(note => note.selected).map(note => note.id);
  }

  get someNotesAreSelected () {
    return this.selectedNoteIds.length !== 0;
  }

  get noteActions () {
    return flatten(this.notes.map(note => note.noteActions));
  }

  get sortedNoteActions () {
    return sortBy(this.noteActions, noteAction => noteAction.absoluteTime);
  }
}
