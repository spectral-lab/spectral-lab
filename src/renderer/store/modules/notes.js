import {CREATE_NOTE} from '../action-types';
import { APPEND_NOTE, ADD_MODULATION } from '../mutation-types';
import '../../typedef';
import { NOTE_ON } from '../../constants/defaults';
import { pick, findLastIndex } from 'lodash';

const noteOnProperties = ['time', 'pitch', 'pressure', 'timbre', 'noteOnVelocity'];
const modulationProperties = ['offsetTime', 'pitch', 'pressure', 'timbre'];
let id = 0;

export const InitialState = {data: []};

export const mutations = {
  [APPEND_NOTE] (state, newNote) {
    state.data = [...state.data, newNote];
  },
  /**
   * @param  {Array.<Modulation>} newModulations
   */
  [ADD_MODULATION] (state, {id, modulations}) {
    const _modulations = Array.isArray(modulations) ? modulations : [modulations];
    _modulations.forEach((mod) => {
      const targetNote = state.data.find(note => note.id === id);
      if (mod.hasOwnProperty('offsetTime')) {
        ;
      } else if (mod.hasOwnProperty('time')) {
        mod.offsetTime = mod.time - targetNote.noteOn.time;
      } else {
        console.error('Modulation has not been applied. Modulation must have `offsetTime` or `time` property.');
        return;
      }
      const modulationToAdd = Object.assign({}, pick(mod, modulationProperties));
      const idx = findLastIndex(targetNote.modulations, (m) => m.offsetTime < modulationToAdd.offsetTime) + 1;
      targetNote.modulations = insert(idx, modulationToAdd, targetNote.modulations);
    });
  }
};

export const actions = {
  [CREATE_NOTE] ({ commit }, newNoteOn) {
    const note = {
      id,
      noteOn: Object.assign({}, NOTE_ON, pick(newNoteOn, noteOnProperties)),
      modulations: [],
      duration: null
    };
    id++;
    commit(APPEND_NOTE, note);
    return note.id;
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
