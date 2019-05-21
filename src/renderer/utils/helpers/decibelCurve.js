import gainToDecibels from 'decibels/from-gain'

const blackThreshold = -78 // in dB
/**
 * this can be used only when you want to change the variance. Range will still be in 0 to 1
 * @param  {number} magnitude from 0. to 1.
 * @return {number} Magnitude with decibel curve. from 0. to 1.
 */
const decibelCurve = (magnitude) => {
  const decibel = Math.max(gainToDecibels(magnitude), blackThreshold)
  return decibel / Math.abs(blackThreshold) + 1
}

export default decibelCurve
