import { ipcRenderer } from 'electron';
import { CREATE, DIALOG } from '../../../constants/event-types';
import { dialogEventHub } from '../../modules';
import { TRACK } from '../../../constants/model-types';
import { createTrack } from '../../interactors/Track';

export const listenIpc = () => {
  ipcRenderer.on(DIALOG, (...args) => {
    dialogEventHub.emit(...args);
  });
  ipcRenderer.on(CREATE, (_ev, { type }) => {
    if (type === TRACK) createTrack();
  });
};
