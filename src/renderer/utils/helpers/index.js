export { default as ftom } from './ftom';
export { default as playAudioBuffer } from './playAudioBuffer';
export { default as fillBlankTime } from './fillBlankTime';
export { default as normalizeMagnitude } from './normalizeMagnitude';
export { default as decibelCurve } from './decibelCurve';

/**
 * @param pitch
 * @returns {{noteNumber: number, pitchBend: number}}
 */
export const pitchToNoteNumberAndPitchBend = pitch => {
  const noteNumber = Math.round(pitch);
  const pitchBend = pitch - noteNumber;
  return { noteNumber, pitchBend };
};

/**
 * @param pitch
 * @param noteNumber
 * @returns {number}
 */
export const pitchAndNoteNumberToPitchBend = (pitch, noteNumber) => pitch - noteNumber;
