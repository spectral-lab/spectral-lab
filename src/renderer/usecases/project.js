// @flow
import { remote } from 'electron';
import fs, { readJSONSync } from 'fs-extra';
import { getStore } from '../store';
import { REPLACE_ENTITIES } from '../store/mutation-types';

const { dialog } = remote;

export const openProject = async (): Promise<void> => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Spectral Lab Project File', extensions: ['sl'] }],
    message: 'Select project file to open'
  });
  replaceEntitiesByProjectFile(filePaths[0]);
};

export const saveProject = async (): Promise<void> => {
  const { filePath } = await dialog.showSaveDialog({
    message: 'Save your project'
  });
  if (filePath) fs.writeJson(filePath, getStore().state.entities);
};

export const newProject = (): void => {
  // eslint-disable-next-line no-self-assign
  window.location.href = window.location.href;
};
export const replaceEntitiesByProjectFile = (path: string) => {
  const entities = readJSONSync(path);
  getStore().commit(REPLACE_ENTITIES, entities);
};
