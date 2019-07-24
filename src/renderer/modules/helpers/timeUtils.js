/**
 * @param {number} sec
 * @param {number} bpm
 * @param {number} ticksPerBeat
 * @returns {number}
 */
export const secToTick = (sec, bpm, ticksPerBeat) => sec / 60 * bpm * ticksPerBeat;
