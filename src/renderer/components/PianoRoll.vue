<template>
  <div>
    <v-layout column>
      <v-flex>
        <Toolbar @mousemode="handleMouseMode" />
      </v-flex>
      <v-flex>
        <info-bar />
      </v-flex>
      <v-flex>
        <canvas ref="spectrogram" />
      </v-flex>
      <v-flex>
        <pixi-container v-bind="{mouseMode}" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Toolbar from './PianoRollToolbar';
import InfoBar from './PianoRollInfoBar';
import PixiContainer from './Pixi';
import * as MOUSE_MODES from '../constants/mouse-modes';
import { renderSpectrogram } from '../modules/render';

export default {
  data () {
    return {
      mouseMode: MOUSE_MODES.SELECT,
      areaToDisplay: {
        upperLeftCorner: {
          time: 0,
          pitch: 120
        },
        numberOfTicks: 50,
        numberOfNoteNumbers: 100
      }
    };
  },
  mounted () {
    this.$store.watch(
      (state) => state.spectrogram,
      (newSpectrogram) => {
        renderSpectrogram(newSpectrogram, this.$refs.spectrogram);
      },
      { deep: true }
    );
  },
  methods: {
    handleMouseMode (m) {
      this.mouseMode = m;
    }
  },
  components: {
    Toolbar,
    InfoBar,
    PixiContainer
  }
};
</script>

<style scoped>
</style>


