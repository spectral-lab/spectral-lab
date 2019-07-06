<template />

<script>
import * as PIXI from 'pixi.js';
/** This Component manages the PIXI Container which represents the Automation Lane. */
export default {
  props: {
    pixelPerTick: Number,
    automationLaneHeight: Number,
    totalTime: Number
  },
  watch: {
    pixelPerTick (val) {}
  },
  mounted () {
    this.initBg();
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
    },
    initBg () {
      const bg = new PIXI.Container();
      const leftRect = new PIXI.Graphics();
      leftRect.beginFill(0x123456);
      leftRect.drawRect(0, 0, 100, 20);
      leftRect.endFill();
      const rightRect = new PIXI.Graphics();
      rightRect.beginFill(0x734567);
      rightRect.drawRect(10, 0, 10, 50);
      bg.addChild(leftRect, rightRect);
      bg.type = 'automationLaneBg';
      rightRect.endFill();
      bg.addChild(leftRect, rightRect);
      this.$nextTick(() => {
        this.$emit('init', bg);
      });
    }
  }
};
</script>