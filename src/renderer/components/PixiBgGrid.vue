<template />

<script>
import * as PIXI from 'pixi.js';
import { BG_GRID } from '../constants/pixi-section-types';
/** This Component manages the PIXI Container which represents the Background Grid. */
export default {
  props: {
    midiKeyboardWidth: Number,
    automationLaneHeight: Number,
    rulerHeight: Number,
    pixelPerTick: Number,
    pixelPerNoteNumber: Number,
    totalTime: Number // in tick
  },
  watch: {
    pixelPerNoteNumber (val) {
      this.bgGrid.children.forEach(child => {
        child.height = 127 * val;
      });
    },
    pixelPerTick (val) {
      this.bgGrid.children.forEach(child => {
        child.width = this.totalTime * val;
      });
    }
  },
  mounted () {
    this.initBgGrid();
    this.drawGrid();
  },
  methods: {
    initBgGrid () {
      this.bgGrid = new PIXI.Container();
      this.bgGrid.type = BG_GRID;
      this.$nextTick(() => {
        this.$emit('init', this.bgGrid);
      });
    },
    drawGrid () {
      const mockRect = new PIXI.Graphics();
      mockRect.beginFill(0x191970);
      mockRect.drawRect(0, 0, this.totalTime * this.pixelPerTick, 127 * this.pixelPerNoteNumber);
      mockRect.endFill();
      this.bgGrid.addChild(mockRect);
    }
  }
};
</script>