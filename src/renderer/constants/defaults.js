export const noteOn = {
  type: 'NOTE_ON',
  time: 0,
  pitchBend: 0,
  noteNumber: 60,
  noteOnVelocity: 0.5,
  timbre: 0.5,
  pressure: 0.5
};

export const outputManagerOptions = {
  masterChannels: [1],
  memberChannels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  pitchBendRange: 48,
  nowCb: () => window.performance.now(),
  midiOutput: { send: console.log }
};

export const bpm = 120;
/** @type {number} tick per beat `ticks = minutes * bpm * tpb` */
export const tpb = 480;
