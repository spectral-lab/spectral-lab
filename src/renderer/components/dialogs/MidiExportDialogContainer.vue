<template>
  <midi-export-dialog
    ref="midiExportDialog"
    @click="handleClick"
    @visibility="handleVisibility"
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
    handleClick (target) {
      this.close();
      switch (target) {
        case SELECTED_CLIPS: return exportSelectedClips();
        default: exportSelectedClips();
      }
    },
    handleVisibility (val) {
      if (this.visible !== val) this.visible = val;
    }
  }
};
</script>

<style scoped>

</style>
