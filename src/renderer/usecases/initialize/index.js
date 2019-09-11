// @flow
import { windowSwitchEventHub } from '../../modules';
import { ARRANGEMENT } from '../../../constants/layout';
import { bindKeys } from './bindKeys';
import { loadMockEntities } from './loadMockEntities';
import { listenIpc } from './listenIpc';
import { insertInitialRecords } from './insertInitialRecords';
import Vue from 'vue';
import { installVuetify } from './InstallVuetify';

export const preMount = () => {
  if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
  Vue.config.productionTip = false;
  installVuetify();
  insertInitialRecords();
};

export const postMount = () => {
  bindKeys();
  listenIpc();
  if (process.env.NODE_ENV === 'development') loadMockEntities();
  windowSwitchEventHub.emit(null, { layout: ARRANGEMENT });
};
