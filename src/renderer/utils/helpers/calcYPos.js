import { ftom } from '../helpers';

/**
 * calculate Y position in canvas from frequency
 * @param  {number} freq
 * @param  {Array.<number>} arrayOfFreqs Center frequencies of all bins in spectrogram
 * @returns {number} Position in canvas. highest=0; lowest=heightOfCanvas;
 */
const calcYPos = (freq, arrayOfFreqs, heightOfCanvas) => {
  const LOW_FREQ_TO_HIDE = 40;
  if (freq < LOW_FREQ_TO_HIDE) {
    return heightOfCanvas;
  }
  const noteNum = ftom(freq);
  const highestNote = ftom(arrayOfFreqs[arrayOfFreqs.length - 1]);
  const lowestNote = ftom(Math.max(LOW_FREQ_TO_HIDE, arrayOfFreqs[0]));
  return heightOfCanvas * (highestNote - noteNum) / (highestNote - lowestNote);
};

export default calcYPos;
