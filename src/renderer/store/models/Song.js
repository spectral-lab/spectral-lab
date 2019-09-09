// @flow
import { makeMandatory } from '../utils';
import { SONG } from '../../../constants/model-types';
import { bpm, songDuration, ticksPerBeat } from '../../../constants/defaults';
import { BaseModel, Track } from '.';

export default class Song extends BaseModel {
  static get entity () {
    return 'songs';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(SONG),
      bpm: this.number(bpm),
      ticksPerBeat: this.number(ticksPerBeat),
      tracks: this.hasMany(Track, 'songId'),
      duration: this.number(songDuration)
    };
  }

  get parent () {
    return null;
  }

  get bpmAndTicksPerBeat () {
    return {
      bpm: this.bpm,
      ticksPerBeat: this.ticksPerBeat
    };
  }
}
