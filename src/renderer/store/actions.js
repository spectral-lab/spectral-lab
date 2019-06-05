import { SET_AUDIO_BUFFER } from '../constants/mutation-types';

const acceptAudio = ({ commit }, { payload }) => {
  const { audioBuffer, fileName } = payload;
  commit({
    type: SET_AUDIO_BUFFER,
    audioBuffer,
    fileName
  });
};

export default {
  acceptAudio
};
