import { app } from 'electron';
import ipcSender from '../modules/IpcSender';
import { CREATE, DIALOG, NEW_PROJECT, SAVE_PROJECT } from '../../constants/event-types';
import { MIDI_EXPORT } from '../../constants/dialog-types';
import { CLIP, TRACK } from '../../constants/model-types';
import { ApplicationMenuKeyBindings } from '../../renderer/templates/keyBinding';

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
      accelerator: ApplicationMenuKeyBindings.Quit,
      click: () => {
        app.quit();
      }
    }
  ]
};

const file = {
  label: 'File',
  submenu: [
    {
      label: 'New Project',
      accelerator: ApplicationMenuKeyBindings.NewProject,
      click: () => {
        ipcSender.send(NEW_PROJECT);
      }
    },
    {
      label: 'Save Project',
      accelerator: ApplicationMenuKeyBindings.SaveProject,
      click: () => {
        ipcSender.send(SAVE_PROJECT);
      }
    },
    {
      label: 'Export MIDI',
      accelerator: ApplicationMenuKeyBindings.ExportMidi,
      click: () => {
        ipcSender.send(DIALOG, { type: MIDI_EXPORT });
      }
    }
  ]
};

const edit = {
  label: 'Edit',
  submenu: [
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

const create = {
  label: 'Create',
  submenu: [
    {
      label: 'New Track',
      click: () => {
        ipcSender.send(CREATE, { type: TRACK });
      }
    },
    {
      label: 'New Clip',
      click: () => {
        ipcSender.send(CREATE, { type: CLIP });
      }
    }
  ]
};

export const menuTemplate = [application, file, edit, create];
export default menuTemplate;
