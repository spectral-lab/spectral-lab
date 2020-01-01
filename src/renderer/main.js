import Vue from 'vue';
import App from './App';
import store from './store';
import { preMount } from './usecases/initialize';

preMount();
/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app');
