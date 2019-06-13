// @ts-nocheck
import { actions, mutations, getters, InitialState } from '../src/renderer/store/modules/notes';
import * as defaults from '../src/renderer/constants/defaults';

const { CREATE_NOTE, MODULATE_NOTE } = actions;
const { APPEND_NOTE, INSERT_MODULATION } = mutations;
const { pitchTransition } = getters;

const NOTEON_0 = {time: 0, pitch: 44.5, noteOnVelocity: 0.1};
const NOTEON_1 = {time: 0.2, pressure: 0.02};
const MODULATION_0 = {offsetTime: 0.2, pitch: 60};
const MODULATION_1 = {offsetTime: 0.21, pressure: 0.03, timbre: 0.001};
const MODULATION_2 = {offsetTime: 0.22, pressure: 0.04, timbre: 0.002};
const MODULATION_3 = {offsetTime: 0.13, pressure: 0.03, timbre: 0.003};

const NOTE_0 = {
  id: 3,
  noteOn: {
    time: 0.2,
    pitch: 60.6,
    noteOnVelocity: 0.1,
    timbre: 0.5,
    pressure: 0.4
  },
  modulations: [],
  duration: null
};

test('appends note', () => {
  const state = InitialState;
  APPEND_NOTE(state, NOTE_0);
  expect(state.data).toHaveLength(1);
  expect(state.data[0]).toHaveProperty('id');
  expect(state.data[0]).toHaveProperty('noteOn', NOTE_0.noteOn);
});

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
  const noteId = CREATE_NOTE({ commit, state }, NOTEON_0);
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
  CREATE_NOTE({ commit, state }, NOTEON_0);
  CREATE_NOTE({ commit, state }, NOTEON_1);
});

test('CREATE_NOTE', (done) => {
  const commit = (type, { noteOn, modulations }) => {
    try {
      expect(type).toBe('APPEND_NOTE');
      expect(noteOn).toHaveProperty('time', NOTEON_0.time);
      expect(noteOn).toHaveProperty('pitch', NOTEON_0.pitch);
      expect(noteOn).toHaveProperty('noteOnVelocity', NOTEON_0.noteOnVelocity);
      expect(noteOn).toHaveProperty('timbre', defaults.NOTE_ON.timbre);
      expect(noteOn).toHaveProperty('timbre', defaults.NOTE_ON.pressure);
      expect(modulations).toEqual([]);
    } catch (err) {
      done(err);
    }
    done();
  };
  const state = InitialState;
  CREATE_NOTE({state, commit}, NOTEON_0);
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
  CREATE_NOTE({state, commit}, Object.assign({}, NOTEON_0, {unwanted: 0.5}));
});

test('INSERT MODULATION', () => {
  const state = {
    data: [{...NOTE_0}]
  };
  INSERT_MODULATION(state, {id: NOTE_0.id, modulation: MODULATION_0});
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
  INSERT_MODULATION(state, {id: NOTE_0.id, modulation: {offsetTime: 0.35, pitch: 0.35}});
  expect(state.data[0].modulations[3]).toHaveProperty('offsetTime', 0.35);
  expect(state.data[0].modulations[3]).toHaveProperty('pitch', 0.35);
  INSERT_MODULATION(state, {id: NOTE_0.id, modulation: {offsetTime: 0.25, pitch: 0.25}});
  expect(state.data[0].modulations[2]).toHaveProperty('offsetTime', 0.25);
  expect(state.data[0].modulations[2]).toHaveProperty('pitch', 0.25);
  INSERT_MODULATION(state, {id: NOTE_0.id, modulation: {offsetTime: 0.15, pitch: 0.15}});
  expect(state.data[0].modulations[1]).toHaveProperty('offsetTime', 0.15);
  expect(state.data[0].modulations[1]).toHaveProperty('pitch', 0.15);
  INSERT_MODULATION(state, {id: NOTE_0.id, modulation: {offsetTime: 0.05, pitch: 0.05}});
  expect(state.data[0].modulations[0]).toHaveProperty('offsetTime', 0.05);
  expect(state.data[0].modulations[0]).toHaveProperty('pitch', 0.05);
});

test('MODULATE_NOTE with one modulation', (done) => {
  const dispatch = (type, { noteOn, modulation }) => {
    try {
      expect(type).toBe('addModulation');
      expect(modulation).toHaveProperty('time', MODULATION_0.time);
      expect(modulation).toHaveProperty('pitch', MODULATION_0.pitch);
    } catch (err) {
      done(err);
    }
    done();
  };
  MODULATE_NOTE({ dispatch }, {id: NOTE_0.id, modulation: MODULATION_0});
});

test('MODULATE_NOTE with array of modulations', (done) => {
  let count = 0;
  const dispatch = (type, { modulations, id }) => {
    try {
      expect(type).toBe('addModulation');
    } catch (err) {
      done(err);
    }
    count++;
    if (count === 4) done();
  };
  MODULATE_NOTE({ dispatch }, {id: NOTE_0.id, modulations: [MODULATION_0, MODULATION_1, MODULATION_2, MODULATION_3]});
});

test('addModulation', (done) => {
  let hasFormatted = false;
  const formattedModulation = { offsetTime: 0.1, pitch: 144 };
  const dispatch = (type, { id, modulation }) => {
    try {
      expect(type).toBe('formatModulation');
      expect(modulation).toHaveProperty('time', MODULATION_0.time);
      expect(modulation).toHaveProperty('pitch', MODULATION_0.pitch);
    } catch (err) {
      done(err);
    }
    hasFormatted = true;
    return formattedModulation;
  };
  const commit = (type, { id, modulation }) => {
    try {
      expect(type).toBe('INSERT_MODULATION');
      expect(modulation).toHaveProperty('offsetTime', formattedModulation.offsetTime);
      expect(modulation).toHaveProperty('pitch', formattedModulation.pitch);
    } catch (err) {
      done(err);
    }
    if (hasFormatted) done();
  };
  actions.addModulation({ dispatch, commit }, {id: NOTE_0.id, modulation: MODULATION_0});
});

test('formatModulation', async (done) => {
  const state = {
    data: [{...NOTE_0}]
  };
  const formatted0 = await actions.formatModulation({state}, {id: NOTE_0.id, modulation: {time: 0.5, pitch: 60}});
  expect(formatted0).toEqual({offsetTime: 0.3, pitch: 60});
  const formatted1 = await actions.formatModulation({state}, {id: NOTE_0.id, modulation: {offsetTime: 0.5, pitch: 60, unwanted: 123}});
  expect(formatted1).toEqual({offsetTime: 0.5, pitch: 60});
  expect(() => {
    actions.formatModulation({state}, {id: NOTE_0.id, modulation: {offsetTime: 0.5, unwanted: 60}});
  }).toThrow();
  expect(() => {
    actions.formatModulation({state}, {id: NOTE_0.id, modulation: {pitch: 60}});
  }).toThrow();
  done();
});

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
  expect(transition[0].pitch).toBe(NOTE_0.noteOn.pitch);
  expect(transition[1].time).toBe(NOTE_0.noteOn.time + MODULATION_0.offsetTime);
  expect(transition[1].pitch).toBe(MODULATION_0.pitch);
});

// test('gets power transision', () => {
//   const note = Note.from([FRAGMENT_0, FRAGMENT_1, FRAGMENT_2]);
//   const powerTransition = note.powerTransition;
//   expect(powerTransition).toHaveLength(2);
//   expect(powerTransition[0].time).toBe(FRAGMENT_0.time);
//   expect(powerTransition[0].power).toBe(FRAGMENT_0.power);
//   expect(powerTransition[1].time).toBe(FRAGMENT_2.time);
//   expect(powerTransition[1].power).toBe(FRAGMENT_2.power);
// });

// test('gets timbre transision', () => {
//   const note = Note.from([FRAGMENT_0, FRAGMENT_1, FRAGMENT_2, FRAGMENT_3, FRAGMENT_4]);
//   const timberTransition = note.timbreTransition;
//   expect(timberTransition).toHaveLength(3);
//   expect(timberTransition[0].time).toBe(defaults.NOTE_ON.time);
//   expect(timberTransition[0].timbre).toBe(defaults.NOTE_ON.timbre);
//   expect(timberTransition[1].time).toBe(FRAGMENT_3.time);
//   expect(timberTransition[1].timbre).toBe(FRAGMENT_3.timbre);
//   expect(timberTransition[2].time).toBe(FRAGMENT_4.time);
//   expect(timberTransition[2].timbre).toBe(FRAGMENT_4.timbre);
// });
