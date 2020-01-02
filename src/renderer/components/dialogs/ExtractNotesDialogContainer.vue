<template>
  <extract-notes-dialog
    ref="midiExportDialog"
    @click="handleClick"
    @visibility="close"
    :visible="visible"
  />
</template>

<script>

import ExtractNotesDialog from './ExtractNotesDialog';
import { extractNotes } from '../../usecases/extractNotes';
import { EXTRACT_NOTES } from '../../../constants/dialog-types';
import { closeDialog, getDialogInDisplay } from '../../interactors/Dialog';
export default {
  components: {
    ExtractNotesDialog
  },
  computed: {
    visible () {
      return getDialogInDisplay() === EXTRACT_NOTES;
    }
  },
  methods: {
    close () {
      if (this.visible) closeDialog();
    },
    handleClick (options) {
      this.close();
      extractNotes(options);
    }
  }
};
</script>

<style scoped>

</style>
