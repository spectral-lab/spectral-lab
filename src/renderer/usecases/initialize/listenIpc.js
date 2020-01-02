// @flow
import { ipcRenderer } from 'electron';
import { CREATE, DIALOG, NEW_PROJECT, SAVE_PROJECT } from '../../../constants/event-types';
import * as create from '../create';
import { noCase } from 'change-case';
import { newProject, saveProject } from '../project';
import { openDialog } from '../../interactors/Dialog';
import * as DialogTypes from '../../../constants/dialog-types';

export const listenIpc = () => {
  ipcRenderer.on(DIALOG, (_ev, payload: { type: $Values<typeof DialogTypes>, contextId?: string, contextType?:string }) => {
    const { type, contextId, contextType } = payload;
    openDialog(type, {
      contextId,
      contextType
    });
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
