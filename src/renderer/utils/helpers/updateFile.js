import loadFileAsArrayBuffer from './loadFileAsArrayBuffer';
import { sumToMono, normalize, crop } from '../audio';

export default async (e) => {
  // e.preventDefault();
  const f = e;
  const context = new AudioContext({latencyHint: 'interactive', sampleRate: 22050});
  const DESIRED_DURATION = 10; // in seconds.
  const loadEvent = await loadFileAsArrayBuffer(f);
  const originalAudioBuffer = await context.decodeAudioData(loadEvent.target.result);
  const monoAudioBuffer = sumToMono(originalAudioBuffer);
  const croppedAudioBuffer = crop(monoAudioBuffer, DESIRED_DURATION);
  const normalizedAudioBuffer = normalize(croppedAudioBuffer);
  this.$store.dispatch({
    type: 'acceptAudio',
    payload: {
      audioBuffer: normalizedAudioBuffer,
      fileName: f.name
    }
  });
};
