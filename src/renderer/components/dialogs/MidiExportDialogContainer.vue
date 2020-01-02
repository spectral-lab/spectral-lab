<template>
  <midi-export-dialog
    ref="midiExportDialog"
    @click="handleClick"
    @visibility="close"
    :visible="visible"
  />
</template>

<script>

import MidiExportDialog from './MidiExportDialog';
import { SELECTED_CLIPS } from '../../../constants/midi-export-options';
import { exportSelectedClips } from '../../usecases/midiExport';
import { closeDialog, getDialogInDisplay } from '../../interactors/Dialog';
import { MIDI_EXPORT } from '../../../constants/dialog-types';
export default {
  components: {
    MidiExportDialog
  },
  computed: {
    visible () {
      return getDialogInDisplay() === MIDI_EXPORT;
    }
  },
  methods: {
    close () {
      if (this.visible) closeDialog();
    },
    handleClick (target) {
      this.close();
      switch (target) {
        case SELECTED_CLIPS: return exportSelectedClips();
        default: exportSelectedClips();
      }
    }
  }
};
</script>

<style scoped>

</style>
