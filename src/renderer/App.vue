<template>
  <div id="app">
    <v-app dark>
      <app-layout />
    </v-app>
    <dialogs />
  </div>
</template>

<script>
import AppLayout from './components/misc/AppLayout';
import Dialogs from './components/dialogs/Dialogs';
export default {
  name: 'App',
  components: {
    AppLayout,
    Dialogs
  }
};
</script>
