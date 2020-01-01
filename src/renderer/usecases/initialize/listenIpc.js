// @flow
import { ipcRenderer } from 'electron';
import { CREATE, DIALOG, NEW_PROJECT, SAVE_PROJECT } from '../../../constants/event-types';
import { dialogEventHub } from '../../modules';
import * as create from '../create';
import { noCase } from 'change-case';
import { newProject, saveProject } from '../project';

export const listenIpc = () => {
  ipcRenderer.on(DIALOG, (...args) => {
    dialogEventHub.emit(...args);
  });
  ipcRenderer.on(CREATE, (_ev, payload) => {
    create[noCase(payload.type)](payload);
  });
  ipcRenderer.on(NEW_PROJECT, () => {
    newProject();
  });
  ipcRenderer.on(SAVE_PROJECT, () => {
    saveProject();
  });
};
