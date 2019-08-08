<template>
  <div id="app">
    <v-app dark>
      <app-layout />
    </v-app>
    <dialog-container />
  </div>
</template>

<script>
import AppLayout from './components/AppLayout';
import DialogContainer from './components/DialogContainer';
export default {
  name: 'App',
  components: {
    AppLayout,
    DialogContainer
  }
};
</script>
