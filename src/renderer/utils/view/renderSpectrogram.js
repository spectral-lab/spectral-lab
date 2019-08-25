import { createRect } from './renderUtils';
import '../../../types';
/**
 * @param  {Spectrogram} spectrogram
 * @param  {HTMLCanvasElement} canvas
 * @return {void}
 */
const renderSpectrogram = (spectrogram, canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!spectrogram) return;
  spectrogram.magnitude2d.forEach((arrayOfMag, rowIdx) => {
    arrayOfMag.forEach((_, columnIdx) => {
      const rect = createRect({ rowIdx, columnIdx, spectrogram, canvas });
      const HUE = 200;
      ctx.globalAlpha = rect.luminance;
      ctx.fillStyle = `hsl(${HUE},100%,${rect.luminance * 100}%)`;
      ctx.fillRect(
        rect.upperLeftCorner.x,
        rect.upperLeftCorner.y,
        rect.width,
        rect.height
      );
    });
  });
};

export default renderSpectrogram;
