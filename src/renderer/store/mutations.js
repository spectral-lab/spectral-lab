import { SET_ENTITIES } from './mutation-types';

export default {
  [SET_ENTITIES] (state, entities) {
    state.entities = entities;
  }
};
