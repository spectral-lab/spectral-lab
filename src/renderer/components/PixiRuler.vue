<template />

<script>
import * as PIXI from 'pixi.js';
/** This Component manages the PIXI Container which represents the Ruler. */
export default {
  props: {
    pixelPerTick: Number
  },
  mounted () {
    this.initRuler();
  },
  methods: {
    initRuler () {
      this.ruler = new PIXI.Container();
      this.ruler.on('scroll', (ev) => {
        this.ruler.x += ev.wheelDeltaX * 0.5;
      });
      this.ruler.type = 'ruler';
      this.$nextTick(() => {
        this.$emit('init', this.ruler);
      });
    }
  }
};
</script>