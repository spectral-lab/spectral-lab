import { REPLACE_ENTITIES } from '../../store/mutation-types';
import mockEntities from '../../../../test/data/json/mockEntities';
import { getStore } from '../../store';

export const loadMockEntities = () => {
  getStore().commit(REPLACE_ENTITIES, mockEntities);
};
