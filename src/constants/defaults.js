
export const outputManagerOptions = {
  masterChannels: [1],
  memberChannels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  pitchBendRange: 48,
  nowCb: () => window.performance.now(),
  send: console.log
};

export const bpm = 120;
/** @type {number} ticks per beat `ticks = minutes * bpm * tpb` */
export const ticksPerBeat = 480;
export const beatsPerBar = 4;
