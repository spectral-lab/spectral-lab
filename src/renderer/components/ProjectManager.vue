<template/>
<script>
import hotkeys from 'hotkeys-js';
import fs from 'fs-extra';
import { SET_AUDIO_CTX } from '../store/mutation-types';
const { dialog } = require('electron').remote;

export default {
  mounted () {
    hotkeys('cmd+s', this.save);
    this.createNew();
  },
  methods: {
    createNew () {
      this.$store.commit(SET_AUDIO_CTX, new AudioContext({
        latencyHint: 'interactive',
        sampleRate: 22050
      }));
    },
    save () {
      const path = dialog.showSaveDialog();
      if (path) fs.writeJson(path, this.$store.state.entities);
    }
  }
};
</script>
