<template />

<script>
import * as PIXI from 'pixi.js';
import { AUTOMATION_LANE, AUTOMATION_LANE_SELECTOR } from '../constants/pixi-section-types';

/** This Component manages the PIXI Container which represents the Automation Lane. */
export default {
  props: {
    automationLaneHeight: Number,
    midiKeyboardWidth: Number
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
      this.automationLane.type = AUTOMATION_LANE;
      this.$nextTick(() => {
        this.$emit('init', this.automationLane);
      });
    },
    initBg () {
      const rect = new PIXI.Graphics();
      rect.beginFill(0x123456);
      rect.drawRect(0, 0, this.midiKeyboardWidth, this.automationLaneHeight);
      rect.endFill();
      rect.type = AUTOMATION_LANE_SELECTOR;
      this.$nextTick(() => {
        this.$emit('init', rect);
      });
    }
  }
};
</script>