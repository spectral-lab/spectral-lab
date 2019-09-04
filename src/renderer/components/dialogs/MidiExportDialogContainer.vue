<template>
  <midi-export-dialog
    ref="midiExportDialog"
    @click="handleClick"
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
    show () {
      this.$refs.midiExportDialog.show();
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
