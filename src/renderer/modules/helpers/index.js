import normalize2d from './normalize2d';
import ftom from './ftom';
import playAudioBuffer from './playAudioBuffer';
import fillBlankTime from './fillBlankTime';
import normalizeMagnitude from './normalizeMagnitude';
import decibelCurve from './decibelCurve';

export {
  normalize2d,
  ftom,
  playAudioBuffer,
  fillBlankTime,
  normalizeMagnitude,
  decibelCurve
};
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
