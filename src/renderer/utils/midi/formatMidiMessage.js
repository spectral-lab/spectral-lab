
import { NOTE_OFF, NOTE_ON, PITCH_BEND, CONTROL_CHANGE, CHANNEL_PRESSURE } from '../../utils/midi/midi-message-types';
import { uint14ToDataBytes, signedFloatToInt14, unsignedFloatToInt7 } from '../../utils/midi/dataByteUtils';
import { deriveStatusByte } from '../../utils/midi/statusByteUtils';

export const noteOffMessage = (noteNumber, noteOffVelocity, midiChannel) => [
  deriveStatusByte(NOTE_OFF, midiChannel),
  noteNumber,
  noteOffVelocity
];

export const noteOnMessage = (noteNumber, noteOnVelocity, midiChannel) => [
  deriveStatusByte(NOTE_ON, midiChannel),
  noteNumber,
  Math.max(noteOnVelocity, 1)
];

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

export const cc74Message = (timbre, midiChannel) => {
  return [
    deriveStatusByte(CONTROL_CHANGE, midiChannel),
    0x4a,
    unsignedFloatToInt7(timbre)
  ];
};

export const channelPressureMessage = (pressure, midiChannel) => {
  return [
    deriveStatusByte(CHANNEL_PRESSURE, midiChannel),
    unsignedFloatToInt7(pressure)
  ];
};
