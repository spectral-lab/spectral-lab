// @ts-nocheck

import { pitchBendMessage, cc74Message, channelPressureMessage, noteOffMessage, noteOnMessage } from '../../src/renderer/utils/midi/formatMidiMessage';

test('pitchBendMessage', () => {
  const pitchBendRange = 48;
  const channel = 3;
  expect(pitchBendMessage(48, pitchBendRange, channel)).toEqual([226, 127, 127]);
  expect(pitchBendMessage(24, pitchBendRange, channel)).toEqual([226, 0, 96]);
  expect(pitchBendMessage(0, pitchBendRange, channel)).toEqual([226, 0, 64]);
  expect(pitchBendMessage(-24, pitchBendRange, channel)).toEqual([226, 0, 32]);
  expect(pitchBendMessage(-48, pitchBendRange, channel)).toEqual([226, 0, 0]);
});

test('pitchBendMessage with pitchBendRange=2', () => {
  const pitchBendRange = 2;
  const channel = 1;
  expect(pitchBendMessage(48, pitchBendRange, channel)).toEqual([224, 127, 127]);
  expect(pitchBendMessage(-48, pitchBendRange, channel)).toEqual([224, 0, 0]);
  expect(pitchBendMessage(0, pitchBendRange, channel)).toEqual([224, 0, 64]);
  expect(pitchBendMessage(0.5, pitchBendRange, channel)).toEqual([224, 0, 80]);
  expect(pitchBendMessage(-0.5, pitchBendRange, channel)).toEqual([224, 0, 48]);
});

test('cc74Message', () => {
  const channel = 1;
  expect(cc74Message(1, channel)).toEqual([176, 74, 127]);
  expect(cc74Message(0.75, channel)).toEqual([176, 74, 96]);
  expect(cc74Message(0.5, channel)).toEqual([176, 74, 64]);
  expect(cc74Message(0.25, channel)).toEqual([176, 74, 32]);
  expect(cc74Message(0, channel)).toEqual([176, 74, 0]);
});

test('channelPressureMessage', () => {
  const channel = 1;
  expect(channelPressureMessage(1, channel)).toEqual([208, 127]);
  expect(channelPressureMessage(0.75, channel)).toEqual([208, 96]);
  expect(channelPressureMessage(0.5, channel)).toEqual([208, 64]);
  expect(channelPressureMessage(0.25, channel)).toEqual([208, 32]);
  expect(channelPressureMessage(0, channel)).toEqual([208, 0]);
});

test('noteOffMessage', () => {
  const channel = 1;
  expect(noteOffMessage(72, 0, channel)).toEqual([128, 72, 0]);
  expect(noteOffMessage(42, 30, channel)).toEqual([128, 42, 30]);
  expect(noteOffMessage(60, 0, channel)).toEqual([128, 60, 0]);
});

test('noteOnMessage', () => {
  const channel = 1;
  expect(noteOnMessage(72, 120, channel)).toEqual([144, 72, 120]);
  expect(noteOnMessage(42, 30, channel)).toEqual([144, 42, 30]);
  expect(noteOnMessage(60, 10, channel)).toEqual([144, 60, 10]);
  expect(noteOnMessage(60, 0, channel)).toEqual([144, 60, 1]);
});
