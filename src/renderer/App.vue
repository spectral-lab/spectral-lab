<template>
  <Main />
</template>

<script>
import store from './store';
import Main from './components/Main.vue';
import './utils/socket';

export default {
  name: 'app',
  store,
  components: {
    Main
  }
};
</script>