import { Song } from '../../store/models';

type Tick = number;
type Ms = number;
export const secToTick = (sec, bpm, ticksPerBeat) => sec / 60 * bpm * ticksPerBeat;
export const msToTick = (ms, bpm, ticksPerBeat) => secToTick(ms / 1000, bpm, ticksPerBeat);
export const tickToMs = (tick, bpm, ticksPerBeat) => {
  return tick / ticksPerBeat / bpm * 60 * 1e3;
};

export const timeConverter = {
  toTick: (ms: number): Tick => {
    const { bpm, ticksPerBeat } = Song.query().first().bpmAndTicksPerBeat;
    return msToTick(ms, bpm, ticksPerBeat);
  },
  toMs: (tick: Tick): Ms => {
    const { bpm, ticksPerBeat } = Song.query().first().bpmAndTicksPerBeat;
    return tickToMs(tick, bpm, ticksPerBeat);
  }
};
