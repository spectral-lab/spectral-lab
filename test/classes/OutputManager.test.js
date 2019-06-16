// @ts-nocheck
import OutputManager from '../../src/renderer/classes/outputManager';

const options = {
  masterChannels: [1],
  memberChannels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  pitchBendRange: 48,
  nowCb: () => 1234.56,
  midiOutput: { output: console.log }
};

const noteOn = {
  pitchBend: 0,
  noteNumber: 60,
  noteOnVelocity: 0.5,
  timbre: 0.5,
  pressure: 0.5
};

const allMemberChannels = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const noteOff = { noteOffVelocity: 0.5 };

test('allocateChannel', () => {
  const outputManager = new OutputManager(options);
  [2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].forEach((ch) => {
    outputManager.findMemberChannel(ch).buildNoteOnRelatedMessages(noteOn);
  });
  expect(outputManager.allocateChannel().midiChannel).toBe(5);
});

test('allocateChannel', () => {
  const outputManager = new OutputManager(options);
  allMemberChannels.forEach((ch) => {
    outputManager.findMemberChannel(ch).buildNoteOnRelatedMessages(noteOn);
  });
  outputManager.findMemberChannel(5).buildNoteOffMessages(noteOff);
  outputManager.findMemberChannel(7).buildNoteOffMessages(noteOff);
  expect(outputManager.allocateChannel().midiChannel).toBe(5);
  allMemberChannels.forEach((ch) => {
    outputManager.findMemberChannel(ch).buildNoteOnRelatedMessages(noteOn);
  });
  outputManager.findMemberChannel(5).timeOfLastNoteOn = 0;
  expect(outputManager.allocateChannel().midiChannel).toBe(5);
});
