import store from '../../store';
import { SET_ENTITIES } from '../../store/mutation-types';
import mockEntities from '../../../../test/data/json/mockEntities';

export const loadMockEntities = () => {
  store.commit(SET_ENTITIES, mockEntities);
};
