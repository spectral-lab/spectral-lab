import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import notes from './modules/notes';
import createLogger from 'vuex/dist/logger';
import { INSERT_MODULATION, SET_NOTE_OFF } from './mutation-types';

Vue.use(Vuex);
const InitialState = {
  audioCtx: new AudioContext({
    latencyHint: 'interactive',
    sampleRate: 22050
  }),
  sourceAudio: {
    filepath: '',
    buffer: new AudioBuffer({
      length: 1,
      numberOfChannels: 1,
      sampleRate: 22050
    })
  },
  spectrogram: {
    times: [],
    freqs: [],
    magnitude2d: [[]]
  }
};
const logger = createLogger({
  filter (mutation) {
    const blackListedTypes = [INSERT_MODULATION, SET_NOTE_OFF];
    return blackListedTypes.includes(mutation.type) === false;
  }
});
const store = new Vuex.Store({
  strict: true,
  state: InitialState,
  mutations,
  actions,
  modules: { notes },
  plugins: [logger]
});

export default store;
export {
  InitialState, mutations, actions
};
