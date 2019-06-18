<template>
  <div>
    <canvas ref="pianoRoll"
        @mousedown="handleMousedown" 
        @mousemove="handleMousemove" 
        @mouseup="handleMouseup" 
        :width="width" 
        :height="height" 
      />
  </div>
</template>

<script>
import { renderPianoRoll } from '../utils/render';
import * as MOUSE_MODES from '../constants/mouse-modes';
import { CREATE_NOTE, MODULATE_NOTE, RELEASE_NOTE } from '../store/action-types';
import { RERENDER } from '../constants/events';

export default {
  props: {
    width: Number,
    height: Number,
    mouseMode: String,
    areaToDisplay: {
      upperLeftCorner: {
        time: Number,
        pitch: Number
      },
      numberOfSeconds: Number,
      numberOfNoteNumbers: Number
    }
  },
  data () {
    return {
      /** @type {?number} */
      drawingNoteId: null,
      latestX: 0
    };
  },
  computed: {
    isDrawing () {
      return this.drawingNoteId !== null;
    },
    notes () {
      return this.$store.getters.notes;
    },
    pixelPerSecond () {
      return this.width / this.areaToDisplay.numberOfSeconds;
    },
    pixelPerNoteNumer () {
      return this.height / this.areaToDisplay.numberOfNoteNumbers;
    }
  },
  created () {
    this.$eventHub.$on(RERENDER, () => {
      this.render(this.notes);
    });
  },
  beforeDestroy () {
    this.$eventHub.$off(RERENDER);
  },
  mounted () {
    this.$store.watch(
      (state) => state.notes,
      (newNotes) => {
        this.render(newNotes.data);
      },
      { deep: true }
    );
  },
  methods: {
    render (notes) {
      renderPianoRoll({
        notes,
        canvas: this.$refs.pianoRoll,
        timeToX: this.timeToX,
        pitchToY: this.pitchToY,
        pitchTransition: this.pitchTransition
      });
    },
    async handleMousedown ({ layerX, layerY }) {
      if (this.mouseMode === MOUSE_MODES.PEN) {
        this.drawingNoteId = await this.$store.dispatch(CREATE_NOTE, {
          time: this.xToTime(layerX),
          pitch: this.yToPitch(layerY)
        });
        this.latestX = layerX;
      }
    },
    handleMousemove ({ layerX, layerY }) {
      if (this.isDrawing) {
        const x = Math.max(layerX, this.latestX);
        const y = layerY;
        this.$store.dispatch(MODULATE_NOTE, {
          id: this.drawingNoteId,
          modulation: {
            time: this.xToTime(x),
            pitch: this.yToPitch(y)
          }
        });
        this.latestX = x;
      }
    },
    handleMouseup ({ layerX }) {
      if (this.isDrawing) {
        const x = Math.max(layerX, this.latestX);
        this.$store.dispatch(RELEASE_NOTE, {
          id: this.drawingNoteId,
          noteOff: {
            time: this.xToTime(x)
          }
        });
        this.latestX = x;
      }
      this.drawingNoteId = null;
    },
    xToTime (x) {
      return this.areaToDisplay.upperLeftCorner.time + x / this.pixelPerSecond;
    },
    timeToX (time) {
      return (time - this.areaToDisplay.upperLeftCorner.time) * this.pixelPerSecond;
    },
    yToPitch (y) {
      return this.areaToDisplay.upperLeftCorner.pitch - y / this.pixelPerNoteNumer;
    },
    pitchToY (pitch) {
      return (this.areaToDisplay.upperLeftCorner.pitch - pitch) * this.pixelPerNoteNumer;
    },
    pitchTransition (id) {
      return this.$store.getters.pitchTransition(id);
    }
  }
};
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
