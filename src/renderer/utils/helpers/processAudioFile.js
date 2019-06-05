import loadFileAsArrayBuffer from './loadFileAsArrayBuffer';
import { sumToMono, normalize, crop } from '../audio';
/**
 * @param  {File} f
 * @returns {{audioBuffer: AudioBuffer, fileName: String}}
 */
export default async (f) => {
  const context = new AudioContext({latencyHint: 'interactive', sampleRate: 22050});
  const DESIRED_DURATION = 10; // in seconds.
  const loadEvent = await loadFileAsArrayBuffer(f);
  const originalAudioBuffer = await context.decodeAudioData(loadEvent.target.result);
  const monoAudioBuffer = sumToMono(originalAudioBuffer);
  const croppedAudioBuffer = crop(monoAudioBuffer, DESIRED_DURATION);
  const normalizedAudioBuffer = normalize(croppedAudioBuffer);
  return {
    audioBuffer: normalizedAudioBuffer,
    fileName: f.name
  };
};
