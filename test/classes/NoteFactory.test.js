// @ts-nocheck
import NoteFactory from '../../src/renderer/modules/NoteFactory';

const MATERIALS_0 = { time: 0.1, pitch: 44.5, noteOnVelocity: 0.1 };
const MATERIALS_1 = { time: 0.2, noteNumber: 60, pitchBend: 11.1, pressure: 0.02 };

describe('creates note from pitch property', () => {
  test('creates note', () => {
    const noteFactory = new NoteFactory();
    const note = noteFactory.createNote(MATERIALS_0);
    expect(note).toEqual({
      id: 0,
      noteOn: {
        type: 'NOTE_ON',
        time: 0.1,
        noteNumber: 45,
        pitchBend: -0.5,
        noteOnVelocity: 0.1,
        timbre: 0.5,
        pressure: 0.5
      },
      noteOff: null,
      modulations: []
    });
  });
  test('assigns unique ids', () => {
    const noteFactory = new NoteFactory();
    const notes = [noteFactory.createNote(MATERIALS_0), noteFactory.createNote(MATERIALS_1)];
    expect(notes[0].id).not.toBe(notes[1].id);
  });
});

describe('creates note from pitch property', () => {
  test('creates note', () => {
    const noteFactory = new NoteFactory();
    const note = noteFactory.createNote(MATERIALS_1);
    expect(note).toEqual({
      id: 0,
      noteOn: {
        type: 'NOTE_ON',
        time: 0.2,
        noteNumber: 60,
        pitchBend: 11.1,
        noteOnVelocity: 0.5,
        timbre: 0.5,
        pressure: 0.02
      },
      noteOff: null,
      modulations: []
    });
  });
});
