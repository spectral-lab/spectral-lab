<template>
  <div>
    <v-toolbar
      color="grey darken-3"
      class="mb-2"
    >
      <v-btn
        @click="handleClickPlay"
        icon
        color="primary"
      >
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
      </v-btn>
      <div>
        <v-toolbar-title>{{ basename }}</v-toolbar-title>
        <div class="filepath">
          {{ filepath }}
        </div>
      </div>
      <v-spacer />
      <upload-button
        @file-update="handleFileUpdate"
        title="Open"
        no-title-update
      >
        Open
      </upload-button>
    </v-toolbar>
  </div>
</template>

<script>
import UploadButton from 'vuetify-upload-button';

export default {
  components: {
    UploadButton
  },
  props: {
    filepath: String,
    basename: String,
    isPlaying: Boolean
  },
  computed: {
    icon () {
      if (this.isPlaying) return 'stop';
      return 'play_arrow';
    }
  },
  methods: {
    handleFileUpdate (file) {
      this.$emit('file-update', file);
    },
    handleClickPlay () {
      this.$emit('click-play');
    }
  }
};
</script>

<style scoped>
  .filepath {
    font-size: 9px;
    color: rgb(180, 180, 180);
  }
</style>
