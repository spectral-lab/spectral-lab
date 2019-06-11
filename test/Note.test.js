// @ts-nocheck
import Note from '../src/renderer/classes/Note';
import { defaultNoteOn } from '../src/renderer/constants/defaults';

const FRAGMENT_0 = {time: 0, pitch: 440, power: 0.1};
const FRAGMENT_1 = {time: 0.1, pitch: 441};
const FRAGMENT_2 = {time: 0.2, power: 0.02};
const FRAGMENT_3 = {time: 0.3, power: 0.03, timbre: 0.003};
const FRAGMENT_4 = {time: 0.4, power: 0.04, timbre: 0.004};

test('instantiates', () => {
  const note = new Note(FRAGMENT_0);
  expect(note).toBeInstanceOf(Note);
  expect(note.transition).toHaveLength(1);
  expect(note.transition[0]).toHaveProperty('time', FRAGMENT_0.time);
  expect(note.transition[0]).toHaveProperty('pitch', FRAGMENT_0.pitch);
  expect(note.transition[0]).toHaveProperty('power', FRAGMENT_0.power);
  expect(note.transition[0]).toHaveProperty('timbre', defaultNoteOn.timbre);
});

test('appends FRAGMENT_1', () => {
  const note = new Note(FRAGMENT_0);
  note.append(FRAGMENT_1);
  expect(note.transition).toHaveLength(2);
  expect(note.transition[1]).toHaveProperty('time', FRAGMENT_1.time);
  expect(note.transition[1]).toHaveProperty('pitch', FRAGMENT_1.pitch);
});

test('instantiates with `from` method', () => {
  const note = Note.from([FRAGMENT_0, FRAGMENT_1, FRAGMENT_2]);
  expect(note).toBeInstanceOf(Note);
  expect(note.transition).toHaveLength(3);
});

test('excludes unwanted properties', () => {
  const note = new Note(Object.assign({}, FRAGMENT_0, {unwanted: 0.5}));
  expect(note.transition[0]).not.toHaveProperty('unwanted');
});

test('assigns unique ids', () => {
  const note1 = new Note(FRAGMENT_0);
  const note2 = new Note(FRAGMENT_1);
  expect(typeof note1.id).toBe('number');
  expect(typeof note2.id).toBe('number');
  expect(note1.id).not.toBe(note2.id);
});

test('gets pitch transision', () => {
  const note = Note.from([FRAGMENT_0, FRAGMENT_1, FRAGMENT_2]);
  const pitchTransition = note.pitchTransition;
  expect(pitchTransition).toHaveLength(2);
  expect(pitchTransition[0].time).toBe(FRAGMENT_0.time);
  expect(pitchTransition[0].pitch).toBe(FRAGMENT_0.pitch);
  expect(pitchTransition[1].time).toBe(FRAGMENT_1.time);
  expect(pitchTransition[1].pitch).toBe(FRAGMENT_1.pitch);
});

test('gets power transision', () => {
  const note = Note.from([FRAGMENT_0, FRAGMENT_1, FRAGMENT_2]);
  const powerTransition = note.powerTransition;
  expect(powerTransition).toHaveLength(2);
  expect(powerTransition[0].time).toBe(FRAGMENT_0.time);
  expect(powerTransition[0].power).toBe(FRAGMENT_0.power);
  expect(powerTransition[1].time).toBe(FRAGMENT_2.time);
  expect(powerTransition[1].power).toBe(FRAGMENT_2.power);
});

test('gets timbre transision', () => {
  const note = Note.from([FRAGMENT_0, FRAGMENT_1, FRAGMENT_2, FRAGMENT_3, FRAGMENT_4]);
  const timberTransition = note.timbreTransition;
  expect(timberTransition).toHaveLength(3);
  expect(timberTransition[0].time).toBe(defaultNoteOn.time);
  expect(timberTransition[0].timbre).toBe(defaultNoteOn.timbre);
  expect(timberTransition[1].time).toBe(FRAGMENT_3.time);
  expect(timberTransition[1].timbre).toBe(FRAGMENT_3.timbre);
  expect(timberTransition[2].time).toBe(FRAGMENT_4.time);
  expect(timberTransition[2].timbre).toBe(FRAGMENT_4.timbre);
});
