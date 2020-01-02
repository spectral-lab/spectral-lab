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
import AppLayout from './components/AppLayout';
import Dialogs from './components/dialogs/Dialogs';
import ContextMenu from './components/utils/ContextMenu';
import { postMount } from './usecases/initialize/hooks';
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
