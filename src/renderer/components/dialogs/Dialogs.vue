<template>
  <div>
    <midi-export-dialog-container :ref="MIDI_EXPORT" />
  </div>
</template>
<script>
import MidiExportDialogContainer from './MidiExportDialogContainer';
import { DIALOG } from '../../../constants/event-types';
import { MIDI_EXPORT } from '../../../constants/dialog-types';
import Vue from 'vue';
export default Vue.extend({
  components: {
    MidiExportDialogContainer
  },
  data () {
    return {
      MIDI_EXPORT
    };
  },
  mounted (): void {
    this.$eventHub.$on(DIALOG, (_ev, payload) => {
      this.$refs[payload.type].show(payload);
    });
  }
});
</script>

<style scoped>

</style>
