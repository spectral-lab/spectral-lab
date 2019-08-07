<template>
  <midi-export-dialog
    ref="midiExportDialog"
    @click="handleClick"
  />
</template>

<script>

import MidiExportDialog from './MidiExportDialog';
import { SELECTED_CLIPS } from '../../constants/midi-export-options';
import { exportSelectedClips } from '../modules/helpers/midiExportUtils';
import { ipcRenderer } from 'electron';
import { MIDI_EXPORT } from '../../constants/message-types';
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
