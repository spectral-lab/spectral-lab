<template>
  <div class="titlebar" style="-webkit-app-region: drag">
    <v-toolbar :height="titleBarHeight" color="grey darken-4">
      <v-spacer />
        Project Title
      <v-spacer />
    </v-toolbar>
  </div>
</template>

<script>
  import { titleBarHeight } from '../constants/layout';
  export default {
    data () {
      return {
        titleBarHeight
      };
    }
  };
</script>

<style scoped>
.titlebar {
  -webkit-app-region: "drag";
  -webkit-user-select: none;
}
</style>

