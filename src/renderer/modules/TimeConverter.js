// @flow
import { Song } from '../store/models';
import { msToTick, tickToMs } from '../utils/helpers/timeUtils';
import type { Ms, Tick } from '../utils/helpers/timeUtils';

export interface ITimeConverter {
  toTick(ms: Ms): Tick;
  toMs(tick: Tick): Ms;
}

export class TimeConverter implements ITimeConverter {
  toTick (ms: Ms): Tick {
    /**
     *  TODO: bpm and ticksPerBeat should be cached as a class property,
     *    and update them by observing vuex store
     */
    const { bpm, ticksPerBeat } = Song.query().first().bpmAndTicksPerBeat;
    return msToTick(ms, bpm, ticksPerBeat);
  }

  toMs (tick: Tick): Ms {
    const { bpm, ticksPerBeat } = Song.query().first().bpmAndTicksPerBeat;
    return tickToMs(tick, bpm, ticksPerBeat);
  }
}
