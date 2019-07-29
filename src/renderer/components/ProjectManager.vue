<template>
  <div />
</template>
<script>
import hotkeys from 'hotkeys-js';
import fs from 'fs-extra';
import { SAVE_PROJECT } from '../constants/key-bindings';
import mockEntities from '../../../test/data/mockEntities';
import { SET_ENTITIES } from '../store/mutation-types';
const { dialog } = require('electron').remote;

export default {
  mounted () {
    hotkeys(SAVE_PROJECT.keys, SAVE_PROJECT.scope, this.save);
    this.loadMockEntities();
  },
  methods: {
    save () {
      const path = dialog.showSaveDialog();
      if (path) fs.writeJson(path, this.$store.state.entities);
    },
    loadMockEntities () {
      this.$store.commit(SET_ENTITIES, mockEntities);
    }
  }
};
</script>
