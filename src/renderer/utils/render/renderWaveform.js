/**
 * subfunction to plot waveform
 * @param  {AudioBuffer} audioBuffer
 * @param  {HTMLCanvasElement} canvas
 */
const renderWaveform = (audioBuffer, canvas) => {
  const DESIRED_LENGTH = 30 * 1000;
  const WAVEFORM_COLOR = 'rgba(255, 243, 97, 1)';
  const channelData = thinOutArray(audioBuffer.getChannelData(0), DESIRED_LENGTH);
  const ctx = canvas.getContext('2d');
  const centerAxis = canvas.height * 0.5;
  const coef = canvas.height * 0.15;
  const interval = canvas.width / (channelData.length - 1);

  //  draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = WAVEFORM_COLOR;
  ctx.beginPath();

  let px = 0;
  let py = centerAxis + coef * channelData[0];
  ctx.moveTo(px, py);

  for (let i = 1; i < channelData.length; i++) {
    px += interval;
    py = centerAxis + coef * channelData[i];
    ctx.lineTo(px, py);
  }
  ctx.stroke();
};

export default renderWaveform;

// Subfunctions

/**
 * subfunction to thin out array by picking up items with a fixed interval.
 * @param  {Float32Array | Array} array
 * @param  {number} DESIRED_LENGTH Integer
 * @return {Array}
 */
const thinOutArray = (array, DESIRED_LENGTH) => {
  const denominator = Math.max(1, Math.ceil(array.length / DESIRED_LENGTH));
  const thinArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i % denominator === 0) {
      thinArray.push(array[i]);
    }
  }
  return thinArray;
};
