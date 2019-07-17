import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import VuexORM from '@vuex-orm/core';
import { initDatabase, instanciateModels } from './utils';

Vue.use(Vuex);
const database = initDatabase();
const InitialState = {
  audioCtx: new AudioContext({
    latencyHint: 'interactive',
    sampleRate: 22050
  })
};
const logger = createLogger();
const store = new Vuex.Store({
  strict: true,
  state: InitialState,
  plugins: [logger, VuexORM.install(database)]
});

instanciateModels();

export default store;
export {
  InitialState
};
