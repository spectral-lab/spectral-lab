import { SET_ENTITIES } from '../../store/mutation-types';
import mockEntities from '../../../../test/data/json/mockEntities';
import { getStore } from '../../store';

export const loadMockEntities = () => {
  getStore().commit(SET_ENTITIES, mockEntities);
};
