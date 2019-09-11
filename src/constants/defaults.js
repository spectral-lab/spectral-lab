
export const midiMessageGeneratorOptions = {
  masterChannels: [1],
  memberChannels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  pitchBendRange: 48,
  nowCb: () => window.performance.now()
};

const bpm = 120;
/** @type {number} ticks per beat `ticks = minutes * bpm * tpb` */
export const ticksPerBeat = 480;
export const beatsPerBar = 4;
export const ticksPerBar = ticksPerBeat * beatsPerBar;
export const msPerTick = 60 * 1e3 / bpm / ticksPerBeat;
/** 8 bars */
export const songDuration = 8 * ticksPerBeat * beatsPerBar;
