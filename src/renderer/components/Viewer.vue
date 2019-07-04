<template>
  <div>
    <v-layout column>
      <v-flex>
        <viewer-toolbar @mousemode="handleMouseMode" />
      </v-flex>
      <v-flex>
        <canvas ref="spectrogram" />
      </v-flex>
      <v-flex class="piano-roll-container">
        <piano-roll
          :mouseMode="mouseMode" 
          :areaToDisplay="areaToDisplay"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ViewerToolbar from './ViewerToolbar.vue';
import PianoRoll from './PianoRoll.vue';
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
        numberOfSeconds: 5,
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
    ViewerToolbar,
    PianoRoll
  }
};
</script>

<style scoped>
.piano-roll-container {
  background: black;
  position: relative;
  top: 0;
  left: 0;
  padding: 0;
  height: 61vh;
  width: 100%;
}
</style>


