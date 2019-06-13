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
import { CREATE_NOTE, MODULATE_NOTE } from '../store/action-types';
import { RERENDER } from '../constants/events';

export default {
  props: {
    width: Number,
    height: Number,
    mouseMode: String,
    scale: {
      pixelPerSecond: Number,
      pixelPerNoteNum: Number
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
      return this.$store.state.notes;
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
        this.render(newNotes);
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
    handleMouseup (e) {
      this.drawingNoteId = null;
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
    xToTime (x) {
      return x / this.scale.pixelPerSecond;
    },
    timeToX (time) {
      return time * this.scale.pixelPerSecond;
    },
    yToPitch (y) {
      return (this.height - y) / this.scale.pixelPerNoteNum;
    },
    pitchToY (pitch) {
      return this.height - pitch * this.scale.pixelPerNoteNum;
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
