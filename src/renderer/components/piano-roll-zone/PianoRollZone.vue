<template>
  <v-content class="piano-roll-zone">
    <v-container
      fluid
      fill-height
    >
      <v-layout column>
        <v-flex>
          <audio-info-container />
        </v-flex>
        <v-flex>
          <toolbar />
        </v-flex>
        <v-flex>
          <div class="piano-roll-wrapper">
            <piano-roll-container />
          </div>
        </v-flex>
        <v-flex>
          <footer-toolbar />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import PianoRollContainer from './PianoRollContainer';
import AudioInfoContainer from './AudioInfoContainer';
import Toolbar from './Toolbar';
import FooterToolbar from './FooterToolbar';

export default {
  components: {
    PianoRollContainer,
    Toolbar,
    FooterToolbar,
    AudioInfoContainer
  }
};
</script>

<style scoped>
    .piano-roll-wrapper {
      height: 60vh;
    }
</style>
