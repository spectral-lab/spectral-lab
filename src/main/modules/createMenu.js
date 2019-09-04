import { Menu } from 'electron';
import template from '../templates/menu';

export default () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
