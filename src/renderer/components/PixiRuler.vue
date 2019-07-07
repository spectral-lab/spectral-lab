<template />

<script>
import * as PIXI from 'pixi.js';
import { RULER, RULER_BG } from '../constants/pixi-section-types';
/** This Component manages the PIXI Container which represents the Ruler. */
export default {
  props: {
    pixelPerTick: Number,
    midiKeyboardWidth: Number,
    rulerHeight: Number,
    totalTime: Number
  },
  watch: {
    pixelPerTick (val) {}
  },
  mounted () {
    this.initBg();
    this.initRuler();
  },
  methods: {
    initRuler () {
      this.ruler = new PIXI.Container();
      this.ruler.x = Number(this.midiKeyboardWidth);
      this.ruler.type = RULER;
      this.$nextTick(() => {
        this.$emit('init', this.ruler);
      });
    },
    initBg () {
      const bg = new PIXI.Container();
      const leftRect = new PIXI.Graphics();
      leftRect.beginFill(0x262626);
      leftRect.drawRect(0, 0, this.midiKeyboardWidth, this.rulerHeight);
      leftRect.endFill();
      const rightRect = new PIXI.Graphics();
      rightRect.beginFill(0x4d5054);
      rightRect.drawRect(this.midiKeyboardWidth, 0, this.totalTime * this.pixelPerTick, this.rulerHeight);
      bg.addChild(leftRect, rightRect);
      bg.type = RULER_BG;
      rightRect.endFill();
      this.$nextTick(() => {
        this.$emit('init', bg);
      });
    }
  }
};
</script>