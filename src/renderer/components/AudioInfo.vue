<template>
  <div>
    <v-toolbar
      color="grey darken-3"
      class="mb-2"
    >
      <v-btn
        icon
        color="primary"
        @click="handleClickPlay"
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
        title="Open"
        no-title-update
        @file-update="handleFileUpdate"
      >
        Open
      </upload-button>
      <icon-btn-with-tip
        icon="build"
        tip="Build a spectrogram of the source audio."
        @click="handleClickBuild"
      />
    </v-toolbar>
  </div>
</template>

<script>
import UploadButton from 'vuetify-upload-button';
import IconBtnWithTip from './IconBtnWithTip';

export default {
  components: {
    UploadButton,
    IconBtnWithTip
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
    },
    handleClickBuild () {
      this.$emit('click-build');
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
