import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import VuexORM from '@vuex-orm/core';
import { createAudioCtx, initDatabase, instanciateModels } from './utils';
import mutations from './mutations';

Vue.use(Vuex);
const database = initDatabase();
const initialState = {
  audioCtx: process.env.NODE_ENV === 'test' ? null : createAudioCtx()
};
const logger = process.env.NODE_ENV === 'development' ? createLogger() : null;
// const logger = null;
const store = new Vuex.Store({
  strict: true,
  state: initialState,
  mutations,
  plugins: [logger, VuexORM.install(database)].filter(v => v)
});

instanciateModels();

export default store;
export {
  initialState
};
