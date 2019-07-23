<template>
  <div id="app">
    <project-manager/>
    <v-app dark>
      <title-bar/>
      <app-layout/>
    </v-app>
  </div>
</template>

<script>
import store from './store';
import ProjectManager from './components/ProjectManager';
import AppLayout from './components/AppLayout';
import TitleBar from './components/TitleBar';

export default {
  name: 'app',
  store,
  components: {
    ProjectManager,
    AppLayout,
    TitleBar
  }
};
</script>

