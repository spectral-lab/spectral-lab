// @flow
import { makeMandatory } from '../store/utils';
import { CLIP } from '../../constants/model-types';
import { beatsPerBar, ticksPerBeat } from '../../constants/defaults';
import { SCALE_COLORS } from '../../constants/colors';
import { random, flatten, sortBy } from 'lodash';
import { AudioBuffer, BaseModel, Track, Note, Bar, Beat } from './index';
import type { NoteAction } from '../../types';
import flatMap from 'lodash/flatMap';

export default class Clip extends BaseModel {
  static get entity () {
    return 'clips';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(CLIP),
      name: this.attr(''),
      offsetTime: this.number(0), // in tick
      duration: this.number(4 * beatsPerBar * ticksPerBeat), // in tick. default is 4 bars. min=1
      notes: this.hasMany(Note, 'clipId'),
      bars: this.hasMany(Bar, 'clipId'),
      audioBuffer: this.hasOne(AudioBuffer, 'clipId'),
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
    return this.absoluteTime + this.duration - 1;
  }

  get selectedNoteIds () {
    return this.notes.filter(note => note.selected).map(note => note.id);
  }

  get someNotesAreSelected () {
    return this.selectedNoteIds.length !== 0;
  }

  get noteActions (): NoteAction[] {
    return flatten((this.notes.map(note => note.noteActions): NoteAction[]));
  }

  get sortedNoteActions ():NoteAction[] {
    return sortBy<NoteAction>(this.noteActions, [noteAction => noteAction.absoluteTime]);
  }

  get beats () {
    return flatMap<Bar[], Beat>(this.bars, bar => bar.beats);
  }
}
