<template />

<script>
import * as PIXI from 'pixi.js';
/** This Component manages the PIXI Container which represents the Playback Line. */
export default {
  props: {
    pixelPerTick: Number
  },
  mounted () {
    this.initPlaybackLine();
  },
  methods: {
    initPlaybackLine () {
      this.playbackLine = new PIXI.Container();
      this.playbackLine.type = 'playbackLine';
      this.$nextTick(() => {
        this.$emit('init', this.playbackLine);
      });
    }
  }
};
</script>