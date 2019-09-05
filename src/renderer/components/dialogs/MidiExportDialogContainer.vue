<template>
  <midi-export-dialog
    ref="midiExportDialog"
    @click="handleClick"
    :visible="visible"
  />
</template>

<script>

import MidiExportDialog from './MidiExportDialog';
import { SELECTED_CLIPS } from '../../../constants/midi-export-options';
import { exportSelectedClips } from '../../usecases/midiExport';
export default {
  components: {
    MidiExportDialog
  },
  methods: {
    open () {
      if (this.visible === false) this.visible = true;
    },
    close () {
      if (this.visible === true) this.visible = false;
    },
    handleClick (target) {
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
