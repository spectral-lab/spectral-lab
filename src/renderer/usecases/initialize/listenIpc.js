// @flow
import { ipcRenderer } from 'electron';
import { CREATE, DIALOG } from '../../../constants/event-types';
import { dialogEventHub } from '../../modules';
import * as create from '../create';
import { noCase } from 'change-case';

export const listenIpc = () => {
  ipcRenderer.on(DIALOG, (...args) => {
    dialogEventHub.emit(...args);
  });
  ipcRenderer.on(CREATE, (_ev, payload) => {
    create[noCase(payload.type)](payload);
  });
};
