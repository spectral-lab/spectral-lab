<template>
  <div id="app">
    <v-app dark>
      <app-layout />
    </v-app>
  </div>
</template>

<script>
import AppLayout from './components/AppLayout';

export default {
  name: 'App',
  components: {
    AppLayout
  }
};
</script>
