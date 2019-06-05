import { SET_AUDIO_BUFFER } from '../constants/mutation-types';
import { ACCEPT_AUDIO } from '../constants/action-types';
import processAudioFile from '../utils/helpers/processAudioFile';

export default {
  async [ACCEPT_AUDIO] ({commit}, {file}) {
    commit(SET_AUDIO_BUFFER, await processAudioFile(file));
  }
};
