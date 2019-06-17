
import { NOTE_OFF, NOTE_ON, PITCH_BEND, CONTROL_CHANGE, CHANNEL_PRESSURE } from '../../constants/midi-message-types';
import { uint14ToDataBytes, signedFloatToInt14, unsignedFloatToInt7 } from '../../utils/midi/dataByteUtils';
import { deriveStatusByte } from '../../utils/midi/statusByteUtils';

/**
 * @param  {number} noteNumber
 * @param  {number} noteOffVelocity
 * @param  {number} midiChannel
 */
export const noteOffMessage = (noteNumber, noteOffVelocity, midiChannel) => [
  deriveStatusByte(NOTE_OFF, midiChannel),
  noteNumber,
  unsignedFloatToInt7(noteOffVelocity)
];

/**
 * @param  {number} noteNumber
 * @param  {number} noteOnVelocity
 * @param  {number} midiChannel
 */
export const noteOnMessage = (noteNumber, noteOnVelocity, midiChannel) => [
  deriveStatusByte(NOTE_ON, midiChannel),
  noteNumber,
  Math.max(unsignedFloatToInt7(noteOnVelocity), 1)
];

/**
 * @param  {number} pitchBend
 * @param  {number} pitchBendRange
 * @param  {number} midiChannel
 */
export const pitchBendMessage = (pitchBend, pitchBendRange, midiChannel) => {
  if (pitchBend > pitchBendRange) {
    console.warn('Pitch bend value exceeds the range');
    return [deriveStatusByte(PITCH_BEND, midiChannel), 0x7f, 0x7f];
  }
  if (pitchBend < -pitchBendRange) {
    console.warn('Pitch bend value exceeds the range');
    return [deriveStatusByte(PITCH_BEND, midiChannel), 0x00, 0x00];
  }
  const [lsb, msb] = uint14ToDataBytes(signedFloatToInt14(pitchBend / pitchBendRange));
  return [deriveStatusByte(PITCH_BEND, midiChannel), lsb, msb];
};

/**
 * @param  {number} timbre
 * @param  {number} midiChannel
 */
export const cc74Message = (timbre, midiChannel) => {
  return [
    deriveStatusByte(CONTROL_CHANGE, midiChannel),
    0x4a,
    unsignedFloatToInt7(timbre)
  ];
};

/**
 * @param  {number} pressure
 * @param  {number} midiChannel
 */
export const channelPressureMessage = (pressure, midiChannel) => {
  return [
    deriveStatusByte(CHANNEL_PRESSURE, midiChannel),
    unsignedFloatToInt7(pressure)
  ];
};
