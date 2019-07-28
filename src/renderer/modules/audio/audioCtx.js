export const createAudioCtx = () => new AudioContext({
  latencyHint: 'interactive',
  sampleRate: 22050
});
export default process.env.NODE_ENV === 'test' ? null : createAudioCtx();
