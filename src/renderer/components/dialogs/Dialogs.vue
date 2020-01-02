<template>
  <div class="dialogs">
    <midi-export-dialog-container />
    <inspect-dialog-container />
    <extract-notes-dialog-container />
  </div>
</template>
<script>
import MidiExportDialogContainer from './MidiExportDialogContainer';
import InspectDialogContainer from './InspectDialogContainer';
import ExtractNotesDialogContainer from './ExtractNotesDialogContainer';
import Vue from 'vue';
export default Vue.extend({
  components: {
    MidiExportDialogContainer,
    InspectDialogContainer,
    ExtractNotesDialogContainer
  }
});
</script>

<style scoped>
.dialogs {
  z-index: 8;
}
</style>
