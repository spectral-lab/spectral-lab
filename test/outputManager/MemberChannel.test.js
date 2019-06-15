// @ts-nocheck
import MemberChannel from '../../src/renderer/classes/outputManager/MemberChannel';

const noteOn = {
  pitchBend: 0,
  noteNumber: 60,
  noteOnVelocity: 0.5,
  timbre: 0.5,
  pressure: 0.5
};

const modulations = [
  { input: { pitchBend: -24 }, expected: [[224, 0, 32]] },
  { input: { pressure: 0.5 }, expected: [[208, 64]] },
  { input: { timbre: 0.5, irrelevantProperty: 1 }, expected: [[176, 74, 64]] },
  {
    input: { pitchBend: 48, timbre: 1, pressure: 1 },
    expected: [[224, 127, 127], [208, 127], [176, 74, 127]]
  }
];

test('instanciates', () => {
  const memberChannel = new MemberChannel({ midiChannel: 3, nowFn: () => 1234.56 });
  expect(memberChannel).toHaveProperty('timeOfLastNoteOff', 1234.56);
  expect(memberChannel).toHaveProperty('midiChannel', 3);
  expect(memberChannel).toHaveProperty('activeNoteOn', null);
});

test('buildNoteOffMessage', () => {
  const memberChannel = new MemberChannel({ midiChannel: 3, nowFn: () => 1234.56 });
  memberChannel.activeNoteOn = {
    noteNumber: 72
  };
  expect(memberChannel.buildNoteOffMessage()).toEqual([130, 72, 0]);
  expect(memberChannel.activeNoteOn).toEqual(null);
  memberChannel.activeNoteOn = {
    noteNumber: 42
  };
  expect(memberChannel.buildNoteOffMessage({ noteOffVelocity: 30 })).toEqual([130, 42, 30]);
  memberChannel.activeNoteOn = {
    noteNumber: 60
  };
  expect(memberChannel.buildNoteOffMessage({ irrelevantProperty: 30 })).toEqual([130, 60, 0]);
});

test('buildNoteOnRelatedMessages', () => {
  const memberChannel = new MemberChannel({ midiChannel: 3, nowFn: () => 1234.56 });
  const midiMessages = memberChannel.buildNoteOnRelatedMessages(noteOn);
  expect(midiMessages).toHaveLength(4);
  expect(midiMessages).toContainEqual([210, 64]);
  expect(midiMessages).toContainEqual([178, 74, 64]);
  expect(midiMessages).toContainEqual([226, 0, 64]);
  expect(midiMessages[3]).toEqual([146, 60, 1]);
});

test('buildModulationMessages', () => {
  const memberChannel = new MemberChannel({ midiChannel: 1, nowFn: () => 1234.56 });
  modulations.forEach(modulation => {
    const actual = memberChannel.buildModulationMessages(modulation.input);
    expect(actual).toEqual(modulation.expected);
  });
});
