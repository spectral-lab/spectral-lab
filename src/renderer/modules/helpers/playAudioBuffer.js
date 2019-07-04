
/**
 * @param  {AudioBuffer} audioBuffer
 * @param  {AudioContext} audioCtx
 */
const playAudioBuffer = (audioBuffer, audioCtx) => {
  if (audioBuffer == null) {
    return;
  }
  const sourceNode = audioCtx.createBufferSource(); // creates a sound source node
  sourceNode.buffer = audioBuffer; // tell the source node which sound to play
  sourceNode.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
  sourceNode.start(0);
  return sourceNode;
};

export default playAudioBuffer;
