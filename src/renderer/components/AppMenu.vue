<template>
  <div>
    <navigation-drawer
      ref="navigationDrawer"
      :menu-template="menuTemplate"
      @click="handleClick"
    />
    <midi-export-dialog-container ref="exportMidiDialog" />
  </div>
</template>

<script>
import menuTemplate, * as menu from '../constants/menu';
import { newProject, saveProject } from '../modules/helpers/projectUtils';
import MidiExportDialogContainer from './MidiExportDialogContainer';
import NavigationDrawer from './NavigationDrawer';

export default {
  components: {
    MidiExportDialogContainer,
    NavigationDrawer
  },
  data () {
    return {
      menuTemplate
    };
  },
  methods: {
    handleClick (type) {
      switch (type) {
        case menu.NEW_PROJECT:
          newProject();
          break;
        case menu.SAVE_PROJECT:
          saveProject();
          break;
        case menu.EXPORT_MIDI:
          this.$refs.navigationDrawer.hide();
          this.$refs.exportMidiDialog.show();
          break;
      }
    }
  }
};
</script>

<style scoped>
</style>
