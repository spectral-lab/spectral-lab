<template />

<script>
import * as PIXI from 'pixi.js';
import { MIDI_KEYBOARD } from '../constants/pixi-section-types';

/** This Component manages the PIXI Container which represents the MIDI Keyboard. */
export default {
  props: {
    pixelPerNoteNumber: Number,
    midiKeyboardWidth: Number
  },
  watch: {
    pixelPerNoteNumber (val) {
      this.midiKeyboard.children.forEach(key => {
        key.height = 127 * val;
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
      this.midiKeyboard.type = MIDI_KEYBOARD;
      this.$nextTick(() => {
        this.$emit('init', this.midiKeyboard);
      });
    },
    drawMidiKeyboard () {
      const mockRect = new PIXI.Graphics();
      mockRect.beginFill(0xFFFFFF);
      mockRect.drawRect(0, 0, this.midiKeyboardWidth, 127 * this.pixelPerNoteNumber);
      mockRect.endFill();
      this.midiKeyboard.addChild(mockRect);
    }
  }
};
</script>