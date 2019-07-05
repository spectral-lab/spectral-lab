<template>
  <div ref="pixiContainer" class="pixi-container">
    <ruler v-bind="{ pixelPerTick }" @init="addToStage" />
    <midi-keyboard v-bind="{ pixelPerNoteNumber }" @init="addToStage" />
    <bg-grid v-bind="{ pixelPerTick, pixelPerNoteNumber }" @init="addToStage" />
    <note-display v-bind="{ pixelPerTick, pixelPerNoteNumber }" @init="addToStage" />
    <automation-lane v-bind="{ pixelPerTick }" @init="addToStage" />
    <playback-line v-bind="{ pixelPerTick }" @init="addToStage" />
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';
import hotkeys from 'hotkeys-js';
import BgGrid from './PixiBgGrid';
import MidiKeyboard from './PixiMidiKeyboard';
import NoteDisplay from './PixiNoteDisplay';
import Ruler from './PixiRuler';
import AutomationLane from './PixiAutomationLane';
import PlaybackLine from './PixiPlaybackLine';

export default {
  props: {
    mouseMode: String,
    areaToDisplay: {
      upperLeftCorner: {
        time: Number,
        pitch: Number
      },
      numberOfTicks: Number,
      numberOfNoteNumbers: Number
    }
  },
  data () {
    return {
      pixelPerTick: 1,
      pixelPerNoteNumber: 2
    };
  },
  mounted () {
    this.initApp();
    this.initScroll();
    this.initKeyboard();
    this.drawPoleStar();
  },
  methods: {
    addToStage (container) {
      console.log('addToStage:', container);
      this.app.stage.addChild(container);
    },
    initScroll () {
      this.$refs.pixiContainer.addEventListener('wheel', function (event) {
        event.preventDefault();
      });
      this.app.view.addEventListener('wheel', (event) => {
        this.app.stage.children.forEach(child => {
          console.log(child);
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
      console.log('initApp', this.app);
      this.app.ticker.maxFPS = 5;
      this.$refs.pixiContainer.appendChild(this.app.view);
    },
    initKeyboard () {
      hotkeys('h', () => { this.pixelPerTick = this.pixelPerTick * 1.2; });
      hotkeys('g', () => { this.pixelPerTick = this.pixelPerTick / 1.2; });
      hotkeys('shift+h', () => { this.pixelPerNoteNumber = this.pixelPerNoteNumber * 1.2; });
      hotkeys('shift+g', () => { this.pixelPerNoteNumber = this.pixelPerNoteNumber / 1.2; });
    },
    drawPoleStar () {
      const poleStar = new PIXI.Graphics();
      this.app.stage.addChild(poleStar);
      poleStar.beginFill(0xFFFFFF);
      poleStar.drawStar(0, 0, 5, 10);
      poleStar.endFill();
      poleStar.on('scroll', (ev) => {
        poleStar.x += ev.wheelDeltaX * 0.5;
        poleStar.y += ev.wheelDeltaY * 0.5;
      });
    }
  },
  components: {
    AutomationLane,
    BgGrid,
    MidiKeyboard,
    NoteDisplay,
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
