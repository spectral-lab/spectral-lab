export const createAudioCtx = () => new AudioContext({
  latencyHint: 'interactive',
  sampleRate: 22050
});
export const audioCtx = process.env.NODE_ENV === 'test' ? null : createAudioCtx();
export default audioCtx;
