<template/>
<script>
import hotkeys from 'hotkeys-js';
import fs from 'fs-extra';
const { dialog } = require('electron').remote;

export default {
  mounted () {
    hotkeys('cmd+s', this.save);
  },
  methods: {
    save () {
      fs.writeJson(dialog.showSaveDialog(), this.$store.state);
    }
  }
};
</script>