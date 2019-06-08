import { decibelCurve, ftom } from '../helpers';
import '../../typedef';

/**
 * @param  {object} param
 * @param  {Number} param.rowIdx
 * @param  {Number} param.columnIdx
 * @param  {Spectrogram} param.spectrogram
 * @param  {HTMLCanvasElement} param.canvas
 * @return {object} Rect object
 */
export const createRect = ({rowIdx, columnIdx, spectrogram, canvas}) => {
  const { numberOfRows, numberOfColumns } = countRowsAndColumns(spectrogram);
  const magnitude = spectrogram.magnitude2d[rowIdx][columnIdx];
  const freqs = spectrogram.freqs;
  const rect = {
    center: {
      x: canvas.width * columnIdx / numberOfColumns,
      y: calcYPos(freqs[rowIdx], freqs, canvas.height)
    },
    isLowestRect: rowIdx === 0,
    isUpmostRect: rowIdx === numberOfRows - 1,
    luminance: decibelCurve(magnitude)
  };

  const oneLowerRectCenterY = rect.isLowestRect ? canvas.height : calcYPos(freqs[rowIdx - 1], freqs, canvas.height);
  const oneUpperRectCenterY = rect.isUpmostRect ? 0 : calcYPos(freqs[rowIdx + 1], freqs, canvas.height);
  rect.width = canvas.width / numberOfColumns;
  rect.lowerRightCorner = {
    x: rect.center.x + rect.width / 2,
    y: (oneLowerRectCenterY + rect.center.y) / 2
  };
  rect.upperLeftCorner = {
    x: rect.center.x - rect.width / 2,
    y: (oneUpperRectCenterY + rect.center.y) / 2
  };
  rect.height = rect.lowerRightCorner.y - rect.upperLeftCorner.y;
  return rect;
};

/**
 * calculate Y position in canvas from frequency
 * @param  {number} freq
 * @param  {Array.<number>} arrayOfFreqs Center frequencies of all bins in spectrogram
 * @returns {number} Position in canvas. highest=0; lowest=heightOfCanvas;
 */
export const calcYPos = (freq, arrayOfFreqs, heightOfCanvas) => {
  const LOW_FREQ_TO_HIDE = 40;
  if (freq < LOW_FREQ_TO_HIDE) {
    return heightOfCanvas;
  }
  const noteNum = ftom(freq);
  const highestNote = ftom(arrayOfFreqs[arrayOfFreqs.length - 1]);
  const lowestNote = ftom(Math.max(LOW_FREQ_TO_HIDE, arrayOfFreqs[0]));
  return heightOfCanvas * (highestNote - noteNum) / (highestNote - lowestNote);
};

const countRowsAndColumns = (spectrogram) => {
  const numberOfRows = spectrogram.magnitude2d.length;
  const numberOfColumns = spectrogram.magnitude2d[0].length;
  if (numberOfRows !== spectrogram.freqs.length) {
    throw new Error('The number of rows in spectrogram does not match the number of frequency bins');
  };
  if (numberOfColumns !== spectrogram.times.length) {
    throw new Error('The number of columns in spectrogram does not match the number of frames');
  };
  return { numberOfRows, numberOfColumns };
};
