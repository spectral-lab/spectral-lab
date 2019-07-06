<template />

<script>
import * as PIXI from 'pixi.js';

/** This Component manages the PIXI Container which represents the MIDI Keyboard. */
export default {
  props: {
    pixelPerNoteNumber: Number,
    midiKeyboardWidth: Number,
    rulerHeight: Number
  },
  watch: {
    pixelPerNoteNumber (val) {
      this.midiKeyboard.children.forEach(key => {
        key.height = 128 * val;
      });
    }
  },
  mounted () {
    this.initMidiKeyboard();
    this.drawMidiKeyboard();
  },
  methods: {
    initMidiKeyboard () {
      this.midiKeyboard = new PIXI.Container();
      this.midiKeyboard.on('scroll', (ev) => {
        this.midiKeyboard.y += ev.wheelDeltaY * 0.5;
      });
      this.midiKeyboard.y = this.rulerHeight;
      this.midiKeyboard.type = 'midiKeyboard';
      this.$nextTick(() => {
        this.$emit('init', this.midiKeyboard);
      });
    },
    drawMidiKeyboard () {
      const mockRect = new PIXI.Graphics();
      mockRect.beginFill(0xFFFFFF);
      mockRect.drawRect(0, 0, this.midiKeyboardWidth, 128 * this.pixelPerNoteNumber);
      mockRect.endFill();
      this.midiKeyboard.addChild(mockRect);
    }
  }
};
</script>