
/** initialize `win` object, which represents a window of STFT. */
export const initWin = (rawWindowSize, originalFloatArray) => {
  const size = normalize(rawWindowSize, originalFloatArray);
  const stepSize = size / 4;
  const getLeftEdgeSampleIdx = windowIdx => windowIdx * stepSize;
  const getRightEdgeSampleIdx = windowIdx => (size - 1) + windowIdx * stepSize;
  const getCenterSampleIdx = windowIdx => size / 2 + windowIdx * stepSize;
  return {
    size,
    getLeftEdgeSampleIdx,
    getRightEdgeSampleIdx,
    getCenterSampleIdx
  };
};

/**
 * Window size must be power of 2. minimum value is 8.
 * @param  {number} windowSize
 * @param  {Float32Array} originalFloatArray
 */
const normalize = (windowSize, originalFloatArray) => {
  if (windowSize < 8) {
    return 8;
  }
  if (windowSize > originalFloatArray.length) {
    return 2 ** Math.floor(Math.log2(originalFloatArray.length));
  }
  return 2 ** Math.round(Math.log2(windowSize));
};

/**
 * @param  {number} windowSize Integer
 * @param  {object} fft instance of FFT class of dsp.js
 * @return {Array.<Number>} An array of center frequencies of each frequency bin.
 */
export const collectCenterFreqs = (windowSize, fft) => {
  const numberOfFrequencyBins = windowSize / 2;
  // @ts-ignore
  const freqs = Array.from({ length: numberOfFrequencyBins }, (_, i) => i).map(i => fft.getBandFrequency(i));
  return freqs;
};
