
import { NOTE_OFF, NOTE_ON, PITCH_BEND, CONTROL_CHANGE, CHANNEL_PRESSURE } from '../../../constants/midi-message-types';
import { uint14ToDataBytes, signedFloatToInt14, unsignedFloatToInt7 } from './dataByteUtils';
import { deriveStatusByte } from './statusByteUtils';
// eslint-disable-next-line no-unused-vars
import { MidiMessage } from '../../typedef';

/**
 * @param  {number} noteNumber
 * @param  {number} noteOffVelocity
 * @param  {number} midiChannel
 */
export const noteOffMessage = (noteNumber: number, noteOffVelocity: number, midiChannel: number): MidiMessage => [
  deriveStatusByte(NOTE_OFF, midiChannel),
  noteNumber,
  unsignedFloatToInt7(noteOffVelocity)
];

/**
 * @param  {number} noteNumber
 * @param  {number} noteOnVelocity
 * @param  {number} midiChannel
 */
export const noteOnMessage = (noteNumber: number, noteOnVelocity: number, midiChannel: number): MidiMessage => [
  deriveStatusByte(NOTE_ON, midiChannel),
  noteNumber,
  Math.max(unsignedFloatToInt7(noteOnVelocity), 1)
];

/**
 * @param  {number} pitchBend
 * @param  {number} pitchBendRange
 * @param  {number} midiChannel
 */
export const pitchBendMessage = (pitchBend: number, pitchBendRange: number, midiChannel: number): MidiMessage => {
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
export const cc74Message = (timbre: number, midiChannel: number): MidiMessage => {
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
export const channelPressureMessage = (pressure: number, midiChannel: number): MidiMessage => {
  return [
    deriveStatusByte(CHANNEL_PRESSURE, midiChannel),
    unsignedFloatToInt7(pressure)
  ];
};
