import { SET_SOURCE_AUDIO } from './mutation-types';
import { ACCEPT_AUDIO } from './action-types';
import processAudioFile from '../modules/helpers/processAudioFile';

export default {
  async [ACCEPT_AUDIO] ({ state, commit }, { file }) {
    const ctx = state.audioCtx;
    const { buffer, filepath } = await processAudioFile(file, ctx);
    commit(SET_SOURCE_AUDIO, { buffer, filepath });
  }
};
