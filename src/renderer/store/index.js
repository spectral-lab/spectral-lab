import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import VuexORM from '@vuex-orm/core';
import { initDatabase } from './utils';
import mutations from './mutations';

export const createStore = () => {
  Vue.use(Vuex);
  return new Vuex.Store({
    strict: true,
    state: {},
    mutations,
    plugins: [
      process.env.NODE_ENV === 'development' && createLogger(),
      VuexORM.install(initDatabase())
    ].filter(v => v)
  });
};

export const getStore = (() => {
  let store;
  return () => {
    if (!store) store = createStore();
    return store;
  };
})();
