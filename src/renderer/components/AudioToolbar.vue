<template>
  <v-toolbar color="grey darken-3" class="mb-2">
    <v-btn icon color="primary">
      <v-icon size="24px">play_arrow</v-icon>
    </v-btn>
    <v-toolbar-title>Audio file name</v-toolbar-title>
    <v-spacer />
    <upload-button @file-update="updateFile" title="Open" noTitleUpdate>Open</upload-button>
  </v-toolbar>
</template>

<script>
import UploadButton from 'vuetify-upload-button';
import updateFile from '../utils/helpers/updateFile';

export default{
  methods: {
    updateFile
  },
  components: {
    UploadButton
  }
};
</script>

<style scoped>
</style>