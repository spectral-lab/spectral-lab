import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);
const InitialState = {
  sourceAudioBuffer: new AudioBuffer({
    length: 1,
    numberOfChannels: 1,
    sampleRate: 22050
  }),
  spectrogram: {
    times: [],
    freqs: [],
    magnitude2d: []
  },
  fileName: ''
};
const store = new Vuex.Store({
  state: InitialState,
  mutations,
  actions
});

export default store;
export {
  InitialState, mutations, actions
};
