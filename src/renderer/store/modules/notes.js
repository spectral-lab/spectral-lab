import { CREATE_NOTE, MODULATE_NOTE } from '../action-types';
import { APPEND_NOTE, INSERT_MODULATION } from '../mutation-types';
import '../../typedef';
import { pick, findIndex } from 'lodash';
import NoteFactory from '../../classes/NoteFactory';

const noteFactory = new NoteFactory();
const modulationProperties = ['offsetTime', 'pitch', 'pressure', 'timbre'];

export const InitialState = { data: [] };
export const mutations = {
  [APPEND_NOTE] (state, newNote) {
    state.data = [...state.data, newNote];
  },
  /**
   * @param  {Array.<Modulation>} newModulations
   */
  [INSERT_MODULATION] (state, { id, modulation }) {
    const targetNote = state.data.find(note => note.id === id);
    const idx = Math.max(0, findIndex(targetNote.modulations, (m) => modulation.offsetTime < m.offsetTime));
    targetNote.modulations = insert(idx, modulation, targetNote.modulations);
  }
};

export const actions = {
  [CREATE_NOTE] ({ commit }, noteOn) {
    const note = noteFactory.createNote(noteOn);
    commit(APPEND_NOTE, note);
    return note.id;
  },
  [MODULATE_NOTE] ({ dispatch }, { modulations, modulation, id }) {
    if (modulations != null) {
      if (Array.isArray(modulations)) {
        modulations.forEach(mod => {
          dispatch('addModulation', { modulation: mod, id });
        });
      }
    }
    if (modulation != null) {
      dispatch('addModulation', { modulation, id });
    }
  },
  // Lowercase actions should not be invoked from the outside of this module
  async addModulation ({ dispatch, commit, state }, { modulation, id }) {
    const modulationToAdd = await dispatch('formatModulation', { modulation, id });
    commit(INSERT_MODULATION, { id, modulation: modulationToAdd });
  },
  formatModulation ({ state }, { modulation, id }) {
    const targetNote = state.data.find(note => note.id === id);
    if (modulation.offsetTime == null) {
      if (modulation.time != null) {
        modulation.offsetTime = modulation.time - targetNote.noteOn.time;
      } else {
        throw new Error('Modulation has not been applied. Modulation must have `offsetTime` or `time` property.');
      }
    }
    const hasInValidModulation = ((m) => m.pitch == null && m.pressure == null && m.timbre == null)(modulation);
    if (hasInValidModulation) {
      throw new Error('Modulation must have either `pitch`, `pressure`, or `timbre` property');
    }
    return modulation.offsetTime < 0 ? (
      Object.assign({}, pick(modulation, modulationProperties), { offsetTime: 0 })) : (
      Object.assign({}, pick(modulation, modulationProperties))
    );
  }
};

export const getters = {
  pitchTransition: state => id => {
    const note = state.data.find(n => n.id === id);
    const pitchModulations = note.modulations.filter(mod => mod.hasOwnProperty('pitch'))
      .map(mod => {
        return {
          time: note.noteOn.time + mod.offsetTime,
          pitch: mod.pitch
        };
      });
    return [
      {
        time: note.noteOn.time,
        pitch: note.noteOn.pitch
      },
      ...pitchModulations
    ];
  },
  getNoteById: state => id => {
    return state.data.find(n => n.id === id);
  }
};

export default {
  namespaced: false,
  state: InitialState,
  mutations,
  actions,
  getters
};

const insert = (n, ins, arr) => [...arr.slice(0, n), ins, ...arr.slice(n)];
