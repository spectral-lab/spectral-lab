import { PeakLine } from '../../classes'; // eslint-disable-line no-unused-vars
import { calcYPos } from './renderUtils';

/**
 * @param  {Array.<PeakLine>} peakLines
 * @param  {HTMLCanvasElement} canvas
 */
const renderPeakLines = (peakLines, spectrogram, canvas) => {
  const PEAKLINES_COLOR = 'rgb(0, 255 , 55)';
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 10;
  ctx.strokeStyle = PEAKLINES_COLOR;

  const totalColumns = spectrogram.times.length;
  const calcXPos = columnIdx => canvas.width * columnIdx / totalColumns;
  const freqs = spectrogram.freqs;

  peakLines.forEach(peakLine => {
    ctx.beginPath();
    peakLine.points.forEach((point, idx) => {
      const rowIdx = Math.round(point.position.row);
      const columnIdx = Math.round(point.position.column);
      if (idx === 0) {
        ctx.moveTo(calcXPos(columnIdx), calcYPos(freqs[rowIdx], freqs, canvas.height));
      }
      ctx.lineTo(calcXPos(columnIdx), calcYPos(freqs[rowIdx], freqs, canvas.height));
    });
    ctx.stroke();
  });
};

export default renderPeakLines;
