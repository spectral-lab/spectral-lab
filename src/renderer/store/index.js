import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import notes from './modules/notes';

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
const store = new Vuex.Store({
  strict: true,
  state: InitialState,
  mutations,
  actions,
  modules: { notes }
});

export default store;
export {
  InitialState, mutations, actions
};
