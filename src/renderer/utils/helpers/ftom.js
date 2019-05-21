/**
 * Convert frequency number in Hz into MIDI Note Number
 * @param {number} freq in Hz
 * @return {number} midi note number in decimal
 */
const ftom = (freq) => {
  const getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x)
  }
  const midiNoteNumber = 12 * getBaseLog(2, freq / 440) + 69
  if (midiNoteNumber < 0) {
    return 0
  }
  if (midiNoteNumber > 127) {
    return 127
  }
  return midiNoteNumber
}

export default ftom
