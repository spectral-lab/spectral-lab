import { app, Menu } from 'electron';
import proccessCommunicator from './proccessCommunicator';

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
        label: 'Midi Export',
        click: () => {
          proccessCommunicator.send('midi-export');
          console.log('send midi-export');
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
