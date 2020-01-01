<template>
  <div class="dialogs">
    <midi-export-dialog-container :ref="MIDI_EXPORT" />
    <inspect-dialog-container :ref="INSPECT" />
    <extract-notes-dialog-container :ref="EXTRACT_NOTES" />
  </div>
</template>
<script>
import MidiExportDialogContainer from './MidiExportDialogContainer';
import InspectDialogContainer from './InspectDialogContainer';
import ExtractNotesDialogContainer from './ExtractNotesDialogContainer';
import { INSPECT, MIDI_EXPORT, EXTRACT_NOTES } from '../../../constants/dialog-types';
import Vue from 'vue';
import { dialogEventHub } from '../../modules/container';
export default Vue.extend({
  components: {
    MidiExportDialogContainer,
    InspectDialogContainer,
    ExtractNotesDialogContainer
  },
  data () {
    return {
      MIDI_EXPORT,
      INSPECT,
      EXTRACT_NOTES
    };
  },
  mounted (): void {
    dialogEventHub.addListener((_ev, payload) => {
      this.$refs[payload.type].open(payload);
    });
  }
});
</script>

<style scoped>
.dialogs {
  z-index: 8;
}

</style>
