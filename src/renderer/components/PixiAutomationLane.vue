<template />

<script>
import * as PIXI from 'pixi.js';
/** This Component manages the PIXI Container which represents the Automation Lane. */
export default {
  props: {
    pixelPerTicks: Number
  },
  mounted () {
    this.initAutomationLane();
  },
  methods: {
    initAutomationLane () {
      this.automationLane = new PIXI.Container();
      this.automationLane.on('scroll', (ev) => {
        this.automationLane.x += ev.wheelDeltaX * 0.5;
      });
      this.automationLane.type = 'automationLane';
      this.$nextTick(() => {
        this.$emit('init', this.automationLane);
      });
    }
  }
};
</script>