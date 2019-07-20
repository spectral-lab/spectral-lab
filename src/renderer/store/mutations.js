import { SET_AUDIO_CTX, SET_ENTITIES } from './mutation-types';

export default {
  [SET_AUDIO_CTX] (state, ctx) {
    state.audioCtx = ctx;
  },
  [SET_ENTITIES] (state, entities) {
    state.entities = entities;
  }
};
