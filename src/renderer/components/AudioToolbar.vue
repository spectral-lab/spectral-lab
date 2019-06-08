<template>
  <v-toolbar color="grey darken-3" class="mb-2">
    <v-btn @click="handleClick" icon color="primary">
      <v-icon size="24px">{{icon}}</v-icon>
    </v-btn>
    <v-toolbar-title>{{filename}}</v-toolbar-title>
    <v-spacer />
    <upload-button @file-update="handleFileUpdate" title="Open" noTitleUpdate>Open</upload-button>
  </v-toolbar>
</template>

<script>
import UploadButton from 'vuetify-upload-button';
import { ACCEPT_AUDIO } from '../constants/action-types';
import { playAudioBuffer } from '../utils/helpers';
import path from 'path';

export default {
  data: function () {
    return {
      sourceNode: null
    };
  },
  computed: {
    filename () {
      const p = this.$store.state.sourceAudio.filepath;
      if (p === '') return 'no source audio';
      return path.basename(p);
    },
    icon: function () {
      if (this.sourceNode != null) return 'stop';
      return 'play_arrow';
    }
  },
  methods: {
    handleFileUpdate (file) {
      this.$store.dispatch(ACCEPT_AUDIO, { file });
    },
    handleClick () {
      if (this.sourceNode != null) {
        this.sourceNode.stop();
        this.sourceNode = null;
        return;
      }
      const ab = this.$store.state.sourceAudio.buffer;
      const ctx = this.$store.state.audioCtx;
      this.sourceNode = playAudioBuffer(ab, ctx);
      this.sourceNode.onended = () => {
        if (this.sourceNode != null) {
          this.sourceNode = null;
        }
      };
    }
  },
  components: {
    UploadButton
  }
};
</script>
