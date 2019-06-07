import { SET_SOURCE_AUDIO } from '../constants/mutation-types';
import { ACCEPT_AUDIO } from '../constants/action-types';
import processAudioFile from '../utils/helpers/processAudioFile';

export default {
  async [ACCEPT_AUDIO] ({state, commit}, {file}) {
    const ctx = state.audioCtx;
    commit(SET_SOURCE_AUDIO, await processAudioFile(file, ctx));
  }
};
