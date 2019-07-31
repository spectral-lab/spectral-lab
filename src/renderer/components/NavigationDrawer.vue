<template>
  <div>
    <v-navigation-drawer
      v-model="showDrawer"
      dark
      temporary
      absolute
    >
      <div class="spacer" />
      <v-list dense>
        <v-list-group
          v-for="menuItem in menuTemplate"
          :key="menuItem.label"
          no-action
        >
          <template #activator>
            <v-list-tile>
              <v-list-tile-title>{{ menuItem.label }}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-card color="grey darken-2">
            <v-list-tile
              v-for="subItem in menuItem.subMenu"
              :key="subItem"
              @click="handleClick(subItem)"
            >
              <v-list-tile-title>
                {{ subItem }}
              </v-list-tile-title>
            </v-list-tile>
          </v-card>
        </v-list-group>
      </v-list>
      <div class="spacer" />
    </v-navigation-drawer>
    <export-midi-dialog ref="exportMidiDialog" />
  </div>
</template>

<script>
import menuTemplate, * as menu from '../constants/menu';
import { newProject, saveProject } from '../modules/helpers/projectUtils';
import ExportMidiDialog from './ExportMidiDialog';
export default {
  components: {
    ExportMidiDialog
  },
  data () {
    return {
      showDrawer: false,
      dialog: null,
      menuTemplate
    };
  },
  mounted () {
    document.addEventListener('mousemove', (ev) => {
      if (ev.pageX < 30) this.showDrawer = true;
    });
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
          this.showDrawer = false;
          this.$refs.exportMidiDialog.show();
          break;
      }
    }
  }
};
</script>

<style scoped>
    .spacer {
        height: 30px;
    }
</style>
