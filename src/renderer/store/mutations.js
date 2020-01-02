import { REPLACE_ENTITIES } from './mutation-types';

export default {
  [REPLACE_ENTITIES] (state, entities) {
    state.entities = { ...entities };
  }
};
