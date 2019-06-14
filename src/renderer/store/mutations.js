import { SET_SOURCE_AUDIO, SET_SPECTROGRAM } from './mutation-types';

export default {
  [SET_SOURCE_AUDIO] (state, { buffer, filepath }) {
    state.sourceAudio = Object.assign({}, { buffer, filepath });
  },
  [SET_SPECTROGRAM] (state, { spectrogram }) {
    state.spectrogram = Object.assign({}, spectrogram);
  }
};
