// @ts-nocheck
import MemberChannel from '../../src/renderer/modules/outputManager/MemberChannel';

const noteOn = {
  pitchBend: 0,
  noteOnVelocity: 0.5,
  timbre: 0.5,
  pressure: 0.5,
  parent: { noteNumber: 60 }
};

const nowCb = () => {
  const [sec, ns] = process.hrtime();
  return sec * 1e3 + ns / 1e6;
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
  const memberChannel = new MemberChannel({ midiChannel: 3, nowCb: () => 1234.56 });
  expect(memberChannel).toHaveProperty('timeOfLastNoteOff', 1234.56);
  expect(memberChannel).toHaveProperty('midiChannel', 3);
});

test('buildNoteOffMessages', () => {
  const memberChannel = new MemberChannel({ midiChannel: 3, nowCb });
  memberChannel._activeNoteOn = {
    parent: { noteNumber: 72 }
  };
  expect(memberChannel.buildNoteOffMessages({})).toEqual([[130, 72, 0]]);
  expect(memberChannel._activeNoteOn).toEqual(null);
  memberChannel._activeNoteOn = {
    parent: { noteNumber: 42 }
  };
  expect(memberChannel.buildNoteOffMessages({ noteOffVelocity: 1 })).toEqual([[130, 42, 127]]);
  memberChannel._activeNoteOn = {
    parent: { noteNumber: 60 }
  };
  expect(memberChannel.buildNoteOffMessages({ irrelevantProperty: 0.5 })).toEqual([[130, 60, 0]]);
});

test('buildNoteOnRelatedMessages', () => {
  const memberChannel = new MemberChannel({ midiChannel: 3, nowCb });
  const midiMessages = memberChannel.buildNoteOnRelatedMessages(noteOn);
  expect(midiMessages).toHaveLength(4);
  expect(midiMessages).toContainEqual([210, 64]);
  expect(midiMessages).toContainEqual([178, 74, 64]);
  expect(midiMessages).toContainEqual([226, 0, 64]);
  expect(midiMessages[3]).toEqual([146, 60, 64]);
});

test('buildModulationMessages', () => {
  const memberChannel = new MemberChannel({ midiChannel: 1, nowCb });
  modulations.forEach(modulation => {
    const actual = memberChannel.buildModulationMessages(modulation.input);
    expect(actual).toEqual(modulation.expected);
  });
});
