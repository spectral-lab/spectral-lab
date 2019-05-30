/**
 * @param  {AudioBuffer} audioBuffer
 */
const playAudioBuffer = (audioBuffer) => {
  if (audioBuffer == null) {
    return;
  }
  const context = new AudioContext({latencyHint: 'interactive', sampleRate: 22050});
  const source = context.createBufferSource(); // creates a sound source
  source.buffer = audioBuffer; // tell the source which sound to play
  source.connect(context.destination); // connect the source to the context's destination (the speakers)
  source.start(0);
  return source;
};

export default playAudioBuffer;
