<template />

<script>
import * as PIXI from 'pixi.js';
/** This Component manages the PIXI Container which represents the Background Grid. */
export default {
  props: {
    pixelPerTick: Number,
    pixelPerNoteNumber: Number,
    midiKeyboardWidth: Number
  },
  watch: {
    pixelPerNoteNumber (val) {
      this.bgGrid.children.forEach(child => {
        child.height = 128 * val;
      });
    },
    pixelPerTick (val) {
      this.bgGrid.children.forEach(child => {
        child.width = this.totalTime * val;
      });
    }
  },
  computed: {
    totalTime () {
      const totalBars = 1;
      return totalBars * 4 * this.$store.state.tpb;
    }
  },
  mounted () {
    this.initBgGrid();
    this.drawGrid();
  },
  methods: {
    initBgGrid () {
      this.bgGrid = new PIXI.Container();
      this.bgGrid.on('scroll', (ev) => {
        this.bgGrid.x += ev.wheelDeltaX * 0.5;
        this.bgGrid.y += ev.wheelDeltaY * 0.5;
      });
      this.bgGrid.type = 'bgGrid';
      this.bgGrid.x = this.midiKeyboardWidth;
      this.$nextTick(() => {
        this.$emit('init', this.bgGrid);
      });
    },
    drawGrid () {
      const mockRect = new PIXI.Graphics();
      mockRect.beginFill(0x191970);
      mockRect.drawRect(0, 0, this.totalTime * this.pixelPerTick, 128 * this.pixelPerNoteNumber);
      mockRect.endFill();
      this.bgGrid.addChild(mockRect);
    }
  }
};
</script>