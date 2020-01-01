<template>
  <extract-notes-dialog
    ref="midiExportDialog"
    @click="handleClick"
    @visibility="handleVisibility"
    :visible="visible"
  />
</template>

<script>

import ExtractNotesDialog from './ExtractNotesDialog';
import { extractNotes } from '../../usecases/extractNotes';
export default {
  components: {
    ExtractNotesDialog
  },
  data () {
    return {
      visible: false
    };
  },
  methods: {
    open () {
      if (this.visible === false) this.visible = true;
    },
    close () {
      if (this.visible === true) this.visible = false;
    },
    handleClick (options) {
      this.close();
      extractNotes(options);
    },
    handleVisibility (val) {
      if (this.visible !== val) this.visible = val;
    }
  }
};
</script>

<style scoped>

</style>
