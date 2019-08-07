// @ts-nocheck
import { NOTE_ON, NOTE_OFF, PITCH_BEND, CONTROL_CHANGE, CHANNEL_PRESSURE } from '../../src/constants/midi-message-types';
import { deriveStatusByte } from '../../src/renderer/modules/midi/statusByteUtils';

test('deriveStatusByte', () => {
  for (let i = 0; i < 16; i++) {
    expect(deriveStatusByte(NOTE_OFF, i + 1)).toBe(128 + i);
    expect(deriveStatusByte(NOTE_ON, i + 1)).toBe(144 + i);
    expect(deriveStatusByte(PITCH_BEND, i + 1)).toBe(224 + i);
    expect(deriveStatusByte(CONTROL_CHANGE, i + 1)).toBe(176 + i);
    expect(deriveStatusByte(CHANNEL_PRESSURE, i + 1)).toBe(208 + i);
  }
});
