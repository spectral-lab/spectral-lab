import loadFileAsArrayBuffer from './loadFileAsArrayBuffer';
import { sumToMono, normalize, crop } from '../audio';
/**
 * @param {File} file
 * @param {AudioContext} audioCtx
 * @returns {Promise<{buffer: AudioBuffer, filepath: String}>}
 */
export default async (file, audioCtx) => {
  const DESIRED_DURATION = 10; // in seconds.
  const loadEvent = await loadFileAsArrayBuffer(file);
  const originalAudioBuffer = await audioCtx.decodeAudioData(loadEvent.target.result);
  const monoAudioBuffer = sumToMono(originalAudioBuffer);
  const croppedAudioBuffer = crop(monoAudioBuffer, DESIRED_DURATION);
  const normalizedAudioBuffer = normalize(croppedAudioBuffer);
  return {
    buffer: normalizedAudioBuffer,
    filepath: file.path
  };
};
