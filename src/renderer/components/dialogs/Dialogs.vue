<template>
  <div>
    <midi-export-dialog-container :ref="MIDI_EXPORT" />
    <inspect-dialog-container :ref="INSPECT" />
  </div>
</template>
<script>
import MidiExportDialogContainer from './MidiExportDialogContainer';
import InspectDialogContainer from './InspectDialogContainer';
import { DIALOG } from '../../../constants/event-types';
import { INSPECT, MIDI_EXPORT } from '../../../constants/dialog-types';
import Vue from 'vue';
export default Vue.extend({
  components: {
    MidiExportDialogContainer,
    InspectDialogContainer
  },
  data () {
    return {
      MIDI_EXPORT,
      INSPECT
    };
  },
  mounted (): void {
    this.$eventHub.$on(DIALOG, (_ev, payload) => {
      this.$refs[payload.type].open(payload);
    });
  }
});
</script>

<style scoped>

</style>
