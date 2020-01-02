// @flow
import { remote } from 'electron';
import fs from 'fs-extra';
import { getStore } from '../store';
const { dialog } = remote;

export const openProject = async (): Promise<void> => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Spectral Lab Project File', extensions: ['sl'] }],
    message: 'Open Project'
  });
  console.log(filePaths);
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
