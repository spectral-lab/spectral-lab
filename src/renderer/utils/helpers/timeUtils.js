export type Tick = number;
export type Ms = number;
export type Sec = number;
export const secToTick = (sec, bpm, ticksPerBeat) => sec / 60 * bpm * ticksPerBeat;
export const msToTick = (ms, bpm, ticksPerBeat) => secToTick(ms / 1000, bpm, ticksPerBeat);
export const tickToMs = (tick, bpm, ticksPerBeat) => tick / ticksPerBeat / bpm * 60 * 1e3;
