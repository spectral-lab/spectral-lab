<template>
  <div id="app">
    <project-manager/>
    <v-app dark>
      <app-layout/>
    </v-app>
  </div>
</template>

<script>
import store from './store';
import ProjectManager from './components/ProjectManager';
import AppLayout from './components/AppLayout';

export default {
  name: 'app',
  store,
  components: {
    ProjectManager,
    AppLayout
  }
};
</script>

