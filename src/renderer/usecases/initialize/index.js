// @flow
import { windowSwitchEventHub } from '../../modules/container';
import { bindKeys } from './bindKeys';
import { loadMockEntities } from './loadMockEntities';
import { listenIpc } from './listenIpc';
import { insertInitialRecords } from './insertInitialRecords';
import Vue from 'vue';
import { installVuetify } from './InstallVuetify';
import { PIANO_ROLL } from '../../../constants/model-types';

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
  windowSwitchEventHub.emit(null, { layout: PIANO_ROLL });
};
