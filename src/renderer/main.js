import Vue from 'vue';
import App from './App';
import { getStore } from './store';
import { preMount } from './usecases/initialize/hooks';

preMount().then(() => {
  new Vue({
    components: { App },
    store: getStore(),
    template: '<App/>'
  }).$mount('#app');
});
