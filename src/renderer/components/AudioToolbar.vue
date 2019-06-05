<template>
  <v-toolbar color="grey darken-3" class="mb-2">
    <v-btn icon color="primary">
      <v-icon size="24px">play_arrow</v-icon>
    </v-btn>
    <v-toolbar-title>Audio file name</v-toolbar-title>
    <v-spacer />
    <upload-button @file-update="handleFileUpdate" title="Open" noTitleUpdate>Open</upload-button>
  </v-toolbar>
</template>

<script>
import UploadButton from 'vuetify-upload-button';
import { ACCEPT_AUDIO } from '../constants/action-types';
export default{
  methods: {
    handleFileUpdate (file) {
      this.$store.dispatch(ACCEPT_AUDIO, { file });
    }
  },
  components: {
    UploadButton
  }
};
</script>

<style scoped>
</style>