import store from '../../store';
import { remote } from 'electron';
import fs from 'fs-extra';
const { dialog } = remote;

export const saveProject = async () => {
  const path = await dialog.showSaveDialog();
  if (path) fs.writeJson(path, store.state.entities);
};

export const newProject = () => {
  // eslint-disable-next-line no-self-assign
  window.location.href = window.location.href;
};
