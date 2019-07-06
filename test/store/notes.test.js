// @ts-nocheck
import { actions, mutations, getters, InitialState } from '../../src/renderer/store/modules/notes';
import * as defaults from '../../src/renderer/constants/defaults';
import mockState from '../data/mockState';

const { CREATE_NOTE, MODULATE_NOTE, RELEASE_NOTE, ADD_NOTE } = actions;
const { APPEND_NOTE, INSERT_MODULATION, SET_NOTE_OFF } = mutations;
const { pitchTransition } = getters;

const MATERIALS_0 = { time: 0, pitch: 44.5, noteOnVelocity: 0.1 };
const MATERIALS_1 = { time: 0.2, noteNumber: 60, pitchBend: 12.2, pressure: 0.02 };
const MODULATION_0 = { offsetTime: 0.2, pitchBend: 0 };
const MODULATION_1 = { offsetTime: 0.21, pressure: 0.03, timbre: 0.001 };
const MODULATION_2 = { offsetTime: 0.22, pressure: 0.04, timbre: 0.002 };
const MODULATION_3 = { offsetTime: 0.13, pressure: 0.03, timbre: 0.003 };

const NOTE_0 = {
  id: 3,
  noteOn: {
    time: 0.2,
    noteNumber: 60,
    pitchBend: 0.6,
    noteOnVelocity: 0.1,
    timbre: 0.5,
    pressure: 0.4
  },
  modulations: [],
  noteOff: null
};

describe('commits mutations', () => {
  test('appends note', () => {
    const state = InitialState;
    APPEND_NOTE(state, NOTE_0);
    expect(state.data).toHaveLength(1);
    expect(state.data[0]).toHaveProperty('id');
    expect(state.data[0]).toHaveProperty('noteOn', NOTE_0.noteOn);
  });

  test('INSERT MODULATION', () => {
    const state = {
      data: [{ ...NOTE_0 }]
    };
    INSERT_MODULATION(state, { id: NOTE_0.id, modulation: MODULATION_0 });
    expect(state.data[0].modulations).toHaveLength(1);
    expect(state.data[0].modulations[0]).toHaveProperty('offsetTime', MODULATION_0.offsetTime);
    expect(state.data[0].modulations[0]).toHaveProperty('pitch', MODULATION_0.pitch);
  });

  test('INSERT MODULATION in ascending order', () => {
    const state = {
      data: [
        Object.assign(NOTE_0, {
          modulations: [
            { offsetTime: 0.1, pitch: 0.1 },
            { offsetTime: 0.2, pitch: 0.2 },
            { offsetTime: 0.3, pitch: 0.3 }
          ]
        })
      ]
    };
    INSERT_MODULATION(state, { id: NOTE_0.id, modulation: { offsetTime: 0.35, pitch: 0.35 } });
    expect(state.data[0].modulations[3]).toHaveProperty('offsetTime', 0.35);
    expect(state.data[0].modulations[3]).toHaveProperty('pitch', 0.35);
    INSERT_MODULATION(state, { id: NOTE_0.id, modulation: { offsetTime: 0.25, pitch: 0.25 } });
    expect(state.data[0].modulations[2]).toHaveProperty('offsetTime', 0.25);
    expect(state.data[0].modulations[2]).toHaveProperty('pitch', 0.25);
    INSERT_MODULATION(state, { id: NOTE_0.id, modulation: { offsetTime: 0.15, pitch: 0.15 } });
    expect(state.data[0].modulations[1]).toHaveProperty('offsetTime', 0.15);
    expect(state.data[0].modulations[1]).toHaveProperty('pitch', 0.15);
    INSERT_MODULATION(state, { id: NOTE_0.id, modulation: { offsetTime: 0.05, pitch: 0.05 } });
    expect(state.data[0].modulations[0]).toHaveProperty('offsetTime', 0.05);
    expect(state.data[0].modulations[0]).toHaveProperty('pitch', 0.05);
  });

  test('SET_NOTE_OFF', () => {
    const state = {
      data: [{ ...NOTE_0 }]
    };
    SET_NOTE_OFF(state, { id: NOTE_0.id, noteOff: { offsetTime: 0.2, noteOffVelocity: 0.5 } });
    expect(state.data[0].noteOff).toHaveProperty('offsetTime', 0.2);
    expect(state.data[0].noteOff).toHaveProperty('noteOffVelocity', 0.5);
  });
});

describe('dispatches actions', () => {
  test('assigns an id and return it', (done) => {
    const commit = (type, { id }) => {
      try {
        expect(type).toBe('APPEND_NOTE');
        expect(typeof id).toBe('number');
      } catch (err) {
        done(err);
      }
      done();
    };
    const state = InitialState;
    const noteId = CREATE_NOTE({ commit, state }, MATERIALS_0);
    expect(typeof noteId === 'number' && (noteId >= 0 || noteId < 0)).toBe(true);
  });

  test('assigns unique ids', (done) => {
    let count = 0;
    const ids = [];
    const commit = (_type, { id }) => {
      ids.push(id);
      count++;
      if (count === 2) {
        try {
          expect(ids[0]).not.toBe(ids[1]);
        } catch (err) {
          done(err);
        }
      }
      done();
    };
    const state = InitialState;
    CREATE_NOTE({ commit, state }, MATERIALS_0);
    CREATE_NOTE({ commit, state }, MATERIALS_1);
  });

  test('CREATE_NOTE', (done) => {
    const commit = (type, { noteOn, modulations }) => {
      try {
        expect(type).toBe('APPEND_NOTE');
        expect(noteOn).toHaveProperty('time', MATERIALS_0.time);
        expect(noteOn).toHaveProperty('noteNumber', 45);
        expect(noteOn).toHaveProperty('pitchBend', -0.5);
        expect(noteOn).toHaveProperty('noteOnVelocity', MATERIALS_0.noteOnVelocity);
        expect(noteOn).toHaveProperty('timbre', defaults.noteOn.timbre);
        expect(noteOn).toHaveProperty('pressure', defaults.noteOn.pressure);
        expect(modulations).toEqual([]);
      } catch (err) {
        done(err);
      }
      done();
    };
    const state = InitialState;
    CREATE_NOTE({ state, commit }, MATERIALS_0);
  });

  test('excludes unwanted properties', (done) => {
    const commit = (_type, { noteOn }) => {
      try {
        expect(noteOn).not.toHaveProperty('unwanted');
      } catch (err) {
        done(err);
      }
      done();
    };
    const state = InitialState;
    CREATE_NOTE({ state, commit }, Object.assign({}, MATERIALS_0, { unwanted: 0.5 }));
  });

  test('ADD_NOTE', (done) => {
    const numberOfNotes = mockState.notes.data.length;
    let count = 0;
    const commit = (type, note) => {
      try {
        expect(type).toBe('APPEND_NOTE');
        expect(note).toHaveProperty('noteOn');
        expect(note).toHaveProperty('noteOff');
        expect(note).toHaveProperty('modulations');
        expect(Array.isArray(note.modulations)).toBe(true);
        expect(note.noteOn).toHaveProperty('type', 'NOTE_ON');
        expect(note.noteOn).toHaveProperty('time');
        expect(note.noteOn).toHaveProperty('noteNumber');
        expect(note.noteOn).toHaveProperty('pitchBend');
        expect(note.noteOn).toHaveProperty('noteOnVelocity');
        expect(note.noteOn).toHaveProperty('timbre');
        expect(note.noteOn).toHaveProperty('pressure');
        count++;
      } catch (err) {
        done(err);
      }
      if (count === numberOfNotes) done();
    };
    mockState.notes.data.forEach(note => {
      ADD_NOTE({ commit }, note);
    });
  });

  test('MODULATE_NOTE', (done) => {
    const state = {
      data: [{ ...NOTE_0 }]
    };
    const expectedMod = { type: 'MODULATION', offsetTime: 0.2, pitchBend: 0.5 };
    const commit = (type, { id, modulation }) => {
      try {
        expect(type).toBe('INSERT_MODULATION');
        expect(id).toBe(NOTE_0.id);
        expect(modulation).toEqual(expectedMod);
      } catch (err) {
        done(err);
      }
      done();
    };
    MODULATE_NOTE({ state, commit }, { id: NOTE_0.id, modulation: { pitchBend: 0.5, offsetTime: 0.2 } });
  });

  test('MODULATE_NOTE with shorthand', (done) => {
    const state = {
      data: [{ ...NOTE_0 }]
    };
    const expectedMod = { type: 'MODULATION', offsetTime: 2, pitchBend: 2 };
    const commit = (type, { id, modulation }) => {
      try {
        expect(type).toBe('INSERT_MODULATION');
        expect(id).toBe(NOTE_0.id);
        expect(modulation).toEqual(expectedMod);
      } catch (err) {
        done(err);
      }
      done();
    };
    MODULATE_NOTE({ state, commit }, { id: NOTE_0.id, modulation: { pitch: 62, time: 2.2 } });
  });

  test('RELEASE_NOTE', (done) => {
    const state = {
      data: [{ ...NOTE_0 }]
    };
    const expectedNoteOff = { type: 'NOTE_OFF', offsetTime: 0.2, noteOffVelocity: 0.5 };
    const commit = (type, { id, noteOff }) => {
      try {
        expect(type).toBe('SET_NOTE_OFF');
        expect(id).toBe(NOTE_0.id);
        expect(noteOff).toEqual(expectedNoteOff);
      } catch (err) {
        done(err);
      }
      done();
    };
    RELEASE_NOTE({ state, commit }, { id: NOTE_0.id, noteOff: { offsetTime: 0.2, noteOffVelocity: 0.5 } });
  });

  test('RELEASE_NOTE with shorthand', (done) => {
    const state = {
      data: [{ ...NOTE_0 }]
    };
    const expectedNoteOff = { type: 'NOTE_OFF', offsetTime: 2, noteOffVelocity: 0 };
    const commit = (type, { id, noteOff }) => {
      try {
        expect(type).toBe('SET_NOTE_OFF');
        expect(id).toBe(NOTE_0.id);
        expect(noteOff).toEqual(expectedNoteOff);
      } catch (err) {
        done(err);
      }
      done();
    };
    RELEASE_NOTE({ state, commit }, { id: NOTE_0.id, noteOff: { time: 2.2 } });
  });
});

describe('invokes getters', () => {
  test('gets pitch transision', () => {
    const state = {
      data: [Object.assign(
        {},
        NOTE_0,
        {
          modulations: [
            MODULATION_0,
            MODULATION_1
          ]
        }
      )]
    };
    const transition = pitchTransition(state)(NOTE_0.id);
    expect(transition).toHaveLength(2);
    expect(transition[0].time).toBe(NOTE_0.noteOn.time);
    expect(transition[0].pitch).toBe(NOTE_0.noteOn.noteNumber + NOTE_0.noteOn.pitchBend);
    expect(transition[1].time).toBe(NOTE_0.noteOn.time + MODULATION_0.offsetTime);
    expect(transition[1].pitch).toBe(NOTE_0.noteOn.noteNumber + MODULATION_0.pitchBend);
  });
});
