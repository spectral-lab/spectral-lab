<template>
  <div>
    <v-layout column>
      <v-flex>
        <viewer-toolbar @mousemode="handleMouseMode" />
      </v-flex>
      <v-flex class="canvas-container" id="canvas-container">
        <canvas ref="spectrogram" :width="canvasWidth" :height="canvasHeight" />
        <piano-roll
          :width="canvasWidth" 
          :height="canvasHeight" 
          :mouseMode="mouseMode" 
          :scale="scale"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { renderSpectrogram } from '../utils/render';
import { debounce } from 'lodash';
import ViewerToolbar from './ViewerToolbar.vue';
import PianoRoll from './PianoRoll.vue';
import * as MOUSE_MODES from '../constants/mouse-modes';
import { RERENDER } from '../constants/events';

export default {
  data () {
    return {
      canvasWidth: 300,
      canvasHeight: 150,
      mouseMode: MOUSE_MODES.SELECT,
      scale: {
        pixelPerSecond: 100,
        pixelPerNoteNum: 7
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
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  created () {
    this.debouncedRefreshCanvas = debounce(this.refreshCanvas, 120);
    this.$eventHub.$on(RERENDER, () => {
      renderSpectrogram(this.$store.state.spectrogram, this.$refs.spectrogram);
    });
  },
  beforeDestroy () {
    this.$eventHub.$off(RERENDER);
  },
  methods: {
    refreshCanvas () {
      this.canvasWidth = document.getElementById('canvas-container').offsetWidth;
      this.canvasHeight = document.getElementById('canvas-container').offsetHeight;
      this.$nextTick(() => {
        this.$eventHub.$emit(RERENDER);
      });
    },
    handleResize () {
      this.debouncedRefreshCanvas();
    },
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
.canvas-container {
  background: black;
  position: relative;
  top: 0;
  left: 0;
  padding: 0;
  height: 60vh;
  width: 100%;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>


