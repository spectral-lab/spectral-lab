<template>
  <midi-export-dialog
    ref="midiExportDialog"
    @click="handleClick"
  />
</template>

<script>

import MidiExportDialog from './MidiExportDialog';
import { SELECTED_CLIPS } from '../../../constants/midi-export-options';
import { ipcRenderer } from 'electron';
import { MIDI_EXPORT } from '../../../constants/message-types';
import { exportSelectedClips } from '../../usecases/midiExport';
export default {
  components: {
    MidiExportDialog
  },
  mounted () {
    ipcRenderer.on(MIDI_EXPORT, () => {
      this.show();
    });
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
