// @flow
import { makeMandatory } from '../utils';
import { PIANO_ROLL } from '../../../constants/model-types';
import { SELECT } from '../../../constants/mouse-modes';
import { flatten } from 'lodash';
import { App, BaseModel, Clip, Song, Note, AudioBuffer } from '.';

export default class PianoRoll extends BaseModel {
  static get entity () {
    return 'pianoRoll';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(PIANO_ROLL),
      appId: this.attr(null, makeMandatory('appId')),
      gridOpacity: this.attr(1),
      spectrogramOpacity: this.attr(1),
      mouseMode: this.string(SELECT)
    };
  }

  get parent () {
    return App.query().whereId(this.appId).first();
  }

  get clips (): Clip[] {
    return Clip.query().where('selected', true).withAllRecursive().get();
  }

  get notes () {
    return flatten<Note, Note>(this.clips.map(clip => clip.notes));
  }

  get selectedNoteIds () {
    return flatten<number, number>(this.clips.map(clip => clip.selectedNoteIds));
  }

  get someNotesAreSelected () {
    return this.clips.some(clip => clip.someNotesAreSelected);
  }

  get audioBuffers () {
    // $FlowFixMe
    return this.clips.map(clip => clip.audioBuffer).filter(v => v);
  }

  get spectrograms () {
    // $FlowFixMe
    return this.audioBuffers.map(audioBuffer => audioBuffer.spectrogram).filter(v => v);
  }

  get beatsPerBar () {
    return this.clips[0].beatsPerBar[0].val;
  }

  get ticksPerBeat () {
    return Song.query().last().ticksPerBeat;
  }

  get displayRange () {
    const start = Math.min(...this.clips.map(clip => clip.startTime));
    const end = Math.max(...this.clips.map(clip => clip.endTime));
    return { start, end };
  }

  get totalTicks () {
    return this.displayRange.end - this.displayRange.start;
  }

  get totalBeats () {
    return this.totalTicks / this.ticksPerBeat;
  }

  get totalBars () {
    return this.totalBeats / this.beatsPerBar;
  }
}
