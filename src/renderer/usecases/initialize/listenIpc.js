// @flow
import { ipcRenderer } from 'electron';
import { CREATE, DIALOG } from '../../../constants/event-types';
import { dialogEventHub } from '../../modules';
import * as insertRecord from '../insertRecord';
import { noCase } from 'change-case';

export const listenIpc = () => {
  ipcRenderer.on(DIALOG, (...args) => {
    dialogEventHub.emit(...args);
  });
  ipcRenderer.on(CREATE, (_ev, payload) => {
    insertRecord[noCase(payload.type)](payload);
  });
};
