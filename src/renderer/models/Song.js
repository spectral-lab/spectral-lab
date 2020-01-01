// @flow
import { makeMandatory } from '../store/utils';
import { SONG } from '../../constants/model-types';
import { msPerTick, songDuration, ticksPerBeat } from '../../constants/defaults';
import { BaseModel, Track } from './index';
import type { Ms, Tick } from '../../types/units';

export default class Song extends BaseModel {
  static get entity () {
    return 'songs';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(SONG),
      msPerTick: this.number(msPerTick),
      tracks: this.hasMany(Track, 'songId'),
      duration: this.number(songDuration)
    };
  }

  msToTick (ms: Ms): Tick {
    return ms / msPerTick;
  }

  tickToMs (tick: Tick): Ms {
    return tick * msPerTick;
  }

  get bpm () {
    return 60 * 1e3 / ticksPerBeat / this.msPerTick;
  }

  get parent () {
    return null;
  }
}
