import { app, Menu } from 'electron';
import proccessCommunicator from './proccessCommunicator';
import { MIDI_EXPORT } from '../../constants/message-types';

export default () => {
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
          proccessCommunicator.send(MIDI_EXPORT);
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

  const template = [application, edit];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
