import { replaceEntitiesByProjectFile } from '../project';

export const loadMockEntities = () => {
  replaceEntitiesByProjectFile('./test/data/json/mockProjectFile.slp');
};
