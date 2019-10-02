// @flow
import type { Ms, Tick } from '../../../types/units';
import { getSongData } from '../../interactors/Song';

export interface ITimeConverter {
  toTick(ms: Ms): Tick;
  toMs(tick: Tick): Ms;
}

export class TimeConverter implements ITimeConverter {
  toTick (ms: Ms): Tick {
    /**
     *  TODO: Song data should be cached as a class property,
     *    and update them by observing vuex store
     */
    return getSongData().msToTick(ms);
  }

  toMs (tick: Tick): Ms {
    return getSongData().tickToMs(tick);
  }
}
