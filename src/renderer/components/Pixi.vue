<template>
  <div ref="pixiContainer" class="pixi-container">
    <ruler v-bind="{ pixelPerTick, rulerHeight, midiKeyboardWidth, totalTime }" @init="addToStage" />
    <midi-keyboard v-bind="{ pixelPerNoteNumber, midiKeyboardWidth, rulerHeight }" @init="addToStage" />
    <bg-grid v-bind="{ pixelPerTick, pixelPerNoteNumber, midiKeyboardWidth, rulerHeight, totalTime }" @init="addToStage" />
    <note-layer v-bind="{ pixelPerTick, pixelPerNoteNumber }" @init="addToStage" />
    <automation-lane v-bind="{ pixelPerTick }" @init="addToStage" />
    <playback-line v-bind="{ pixelPerTick }" @init="addToStage" />
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';
import hotkeys from 'hotkeys-js';
import BgGrid from './PixiBgGrid';
import MidiKeyboard from './PixiMidiKeyboard';
import NoteLayer from './PixiNoteLayer';
import Ruler from './PixiRuler';
import AutomationLane from './PixiAutomationLane';
import PlaybackLine from './PixiPlaybackLine';
import { pixelPerTick, pixelPerNoteNumber, midiKeyboardWidth, rulerHeight } from '../constants/pixi-initial-data';

export default {
  props: {
    mouseMode: String
  },
  data () {
    return {
      pixelPerTick,
      pixelPerNoteNumber,
      midiKeyboardWidth,
      rulerHeight
    };
  },
  mounted () {
    this.initApp();
    this.initScroll();
    this.initKeyboard();
  },
  computed: {
    totalTime () {
      const totalBars = 1;
      return totalBars * 4 * this.$store.state.tpb;
    }
  },
  methods: {
    /** @param {PIXI.Container} pixiContainer **/
    addToStage (pixiContainer) {
      this.positionChildren(pixiContainer);
      this.app.stage.addChild(pixiContainer);
    },
    /** @param {PIXI.Container} container **/
    positionChildren (container) {
      switch (container.type) {
        case 'bgGrid':
          container.position.set(3, 3);
          break;
        case 'bgescape':
          container.position.set(2, 5);
          break;
      }
    },
    initScroll () {
      this.$refs.pixiContainer.addEventListener('wheel', function (event) {
        event.preventDefault();
      });
      this.app.view.addEventListener('wheel', (event) => {
        this.app.stage.children.forEach(child => {
          child.emit('scroll', event);
        });
      });
    },
    initApp () {
      PIXI.utils.skipHello();
      this.app = new PIXI.Application({
        backgroundColor: 0x222222,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
        resizeTo: this.$refs.pixiContainer,
        autoDensity: true
      });
      this.app.ticker.maxFPS = 5;
      this.$refs.pixiContainer.appendChild(this.app.view);
    },
    initKeyboard () {
      hotkeys('h', () => { this.pixelPerTick = this.pixelPerTick * 1.2; });
      hotkeys('g', () => { this.pixelPerTick = this.pixelPerTick / 1.2; });
      hotkeys('shift+h', () => { this.pixelPerNoteNumber = this.pixelPerNoteNumber * 1.2; });
      hotkeys('shift+g', () => { this.pixelPerNoteNumber = this.pixelPerNoteNumber / 1.2; });
    }
  },
  components: {
    AutomationLane,
    BgGrid,
    MidiKeyboard,
    NoteLayer,
    Ruler,
    PlaybackLine
  }
};
</script>

<style scoped>
.pixi-container {
  width: 100%;
  height: 60vh;
  overflow: hidden;
}
</style>
