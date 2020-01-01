<template>
  <div id="app">
    <v-app dark>
      <app-layout />
    </v-app>
    <dialogs />
    <context-menu />
  </div>
</template>

<script>
import AppLayout from './components/misc/AppLayout';
import Dialogs from './components/dialogs/Dialogs';
import ContextMenu from './components/misc/ContextMenu';
import { postMount } from './usecases/initialize';
export default {
  name: 'App',
  components: {
    AppLayout,
    Dialogs,
    ContextMenu
  },
  mounted () {
    postMount();
  }
};
</script>
