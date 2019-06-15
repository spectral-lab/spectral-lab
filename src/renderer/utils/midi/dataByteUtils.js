/**
 * Scales 7-bit values into the 14-bit range.
 *
 * @param {number} input Input 7-bit integer.
 * @returns {number} Scaled 14-bit integer.
 */
export const scale7To14Bit = input => {
  if (input > 127) {
    throw new RangeError(
      `scale7To14Bit takes a 7-bit integer.\n` +
      `scale7To14Bit(${input}) is invalid.`
    );
  }
  if (input <= 64) {
    return input << 7;
  }
  return (input / 127) * 16383;
};

/**
 * Converts one or two MIDI data bytes into normalized 14-bit values.
 *
 * @param {Array.<number>} midiDataBytes The encoded data from a standard MIDI message.
 * @returns {number} Normalized 14-bit integer representation of the inputs.
 */
export const dataBytesToUint14 = midiDataBytes => {
  // Discard identifier bit.
  const midiDataByteContents = midiDataBytes.map(dataByte => 127 & dataByte);
  switch (midiDataBytes.length) {
    case 1:
      // With one 7-bit value, scale to a 14-bit integer.
      return scale7To14Bit(midiDataByteContents[0]);
    case 2:
      // With two 7-bit values, combine to make one 14-bit integer
      return (midiDataByteContents[0] << 7) + midiDataByteContents[1];
  }
  throw new Error(
    `midiDataToMpeValue takes one or two 8-bit integers.\n` +
    `midiDataToMpeValue(${midiDataBytes}) is invalid.`
  );
};

/**
 * Converts 14-bit number into two MIDI data bytes.
 *
 * @param {number} input 14-bit integer to be converted.
 * @returns {Array.<number>} [lsb, msb] for a standard MIDI message.
 */
export const uint14ToDataBytes = input => {
  const msb = Math.floor(input / 128);
  const lsb = input - msb * 128;
  return [lsb, msb];
};

export const int7ToUnsignedFloat = v => v <= 64
  ? 0.5 * v / 64
  : 0.5 + 0.5 * (v - 64) / 63;

export const int14ToUnsignedFloat = v => v <= 8192
  ? 0.5 * v / 8192
  : 0.5 + 0.5 * (v - 8192) / 8191;

export const int14ToSignedFloat = v => v <= 8192
  ? v / 8192 - 1
  : (v - 8192) / 8191;

export const unsignedFloatToInt7 = v => v <= 0.5
  ? Math.round(v * 64 / 0.5)
  : Math.round((v - 0.5) * 63 / 0.5 + 64);

export const unsignedFloatToInt14 = v => v <= 0.5
  ? Math.round(v * 8192 / 0.5)
  : Math.round((v - 0.5) * 8191 / 0.5 + 8192);

export const signedFloatToInt14 = v => v <= 0.5
  ? Math.round((v + 1) * 8192)
  : Math.round(v * 8191 + 8192);
