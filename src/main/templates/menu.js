import { app } from 'electron';
import ipcSender from '../modules/IpcSender';
import { DIALOG } from '../../constants/event-types';
import { MIDI_EXPORT } from '../../constants/dialog-types';

const application = {
  label: 'Application',
  submenu: [
    {
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ]
};

const edit = {
  label: 'Edit',
  submenu: [
    {
      label: 'Export MIDI',
      click: () => {
        ipcSender.send(DIALOG, { type: MIDI_EXPORT });
      }
    },
    {
      type: 'separator'
    },
    {
      role: 'cut'
    },
    {
      role: 'copy'
    },
    {
      role: 'paste'
    },
    {
      role: 'selectAll'
    }
  ]
};

export const menuTemplate = [application, edit];
export default menuTemplate;
