import { SET_SOURCE_AUDIO } from '../constants/mutation-types';
import { ACCEPT_AUDIO } from '../constants/action-types';
import processAudioFile from '../utils/helpers/processAudioFile';

export default {
  async [ACCEPT_AUDIO] ({ state, commit }, { file }) {
    const ctx = state.audioCtx;
    const { buffer, filepath } = await processAudioFile(file, ctx);
    commit({
      type: SET_SOURCE_AUDIO,
      buffer,
      filepath
    });
  }
};
