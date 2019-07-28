import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import VuexORM from '@vuex-orm/core';
import { initDatabase, instanciateModels } from './utils';
import mutations from './mutations';

Vue.use(Vuex);
const database = initDatabase();
const logger = process.env.NODE_ENV === 'development' ? createLogger() : null;
// const logger = null;
const store = new Vuex.Store({
  strict: true,
  state: {},
  mutations,
  plugins: [logger, VuexORM.install(database)].filter(v => v)
});

instanciateModels();

export default store;
