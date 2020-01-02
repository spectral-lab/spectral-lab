import { decibelCurve, ftom, pitchAndNoteNumberToPitchBend, pitchToNoteNumberAndPitchBend } from './index';
import uid from 'uid';

/**
 * @param  {Array.<number>} noteOnPoint
 * @param  {object} spectrogram
 */
export const parsePointAsNoteOn = (noteOnPoint, spectrogram) => {
  const timeIdx = noteOnPoint[0]; // float
  const timeInterval = spectrogram.times[1] - spectrogram.times[0];
  const time = spectrogram.times[Math.floor(timeIdx)] + timeInterval * (timeIdx - Math.floor(timeIdx));
  const freqIdx = noteOnPoint[1]; // float
  const freqInterval = spectrogram.freqs[1] - spectrogram.freqs[0];
  const freq = spectrogram.freqs[Math.floor(freqIdx)] + freqInterval * (freqIdx - Math.floor(freqIdx));
  const pitch = ftom(freq);
  const { noteNumber, pitchBend } = pitchToNoteNumberAndPitchBend(pitch);
  return {
    note: {
      offsetTime: time,
      noteNumber
    },
    noteOn: {
      id: uid(),
      pitchBend,
      noteOnVelocity: decibelCurve(noteOnPoint[2]),
      pressure: decibelCurve(noteOnPoint[2])
    }
  };
};
/**
 * @param  {Array.<number>} modulationPoint
 * @param  {object} spectrogram
 * @param  {number} noteOnTime
 * @param  {number} noteNumber
 */
export const parsePointAsModulation = (modulationPoint, spectrogram, noteOnTime, noteNumber) => {
  const timeIdx = modulationPoint[0]; // float
  const timeInterval = spectrogram.times[1] - spectrogram.times[0];
  const time = spectrogram.times[Math.floor(timeIdx)] + timeInterval * (timeIdx - Math.floor(timeIdx));
  const freqIdx = modulationPoint[1]; // float
  const freqInterval = spectrogram.freqs[1] - spectrogram.freqs[0];
  const freq = spectrogram.freqs[Math.floor(freqIdx)] + freqInterval * (freqIdx - Math.floor(freqIdx));
  const pitch = ftom(freq);
  return {
    id: uid(),
    offsetTime: time - noteOnTime,
    pitchBend: pitchAndNoteNumberToPitchBend(pitch, noteNumber),
    pressure: decibelCurve(modulationPoint[2])
  };
};
/**
 * @param  {Array.<number>} noteOffPoint
 * @param  {object} spectrogram
 * @param  {number} noteOnTime
 * @param  {number} noteNumber
 */
export const parsePointAsNoteOff = (noteOffPoint, spectrogram, noteOnTime, noteNumber) => {
  const timeIdx = noteOffPoint[0]; // float
  const timeInterval = spectrogram.times[1] - spectrogram.times[0];
  const time = spectrogram.times[Math.floor(timeIdx)] + timeInterval * (timeIdx - Math.floor(timeIdx));
  const freqIdx = noteOffPoint[1]; // float
  const freqInterval = spectrogram.freqs[1] - spectrogram.freqs[0];
  const freq = spectrogram.freqs[Math.floor(freqIdx)] + freqInterval * (freqIdx - Math.floor(freqIdx));
  const pitch = ftom(freq);
  return {
    id: uid(),
    offsetTime: time - noteOnTime,
    noteOffVelocity: decibelCurve(noteOffPoint[2]),
    pitchBend: pitchAndNoteNumberToPitchBend(pitch, noteNumber),
    pressure: decibelCurve(noteOffPoint[2])
  };
};
