import gainToDecibels from 'decibels/from-gain';

/**
 * @param {number} origMagnitude original value from 0. to 1.
 * @return {number} normalized value from 0. to 1.
 */
const normalizeMagnitude = (origMagnitude) => {
  const blackThreshold = -78;
  return (Math.max(gainToDecibels(origMagnitude), blackThreshold) + Math.abs(blackThreshold)) / Math.abs(blackThreshold);
};

export default normalizeMagnitude;
