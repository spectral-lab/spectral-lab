<template>
  <div ref="pixiContainer" class="pixi-container">
    <ruler v-bind="{ pixelPerTick, rulerHeight, midiKeyboardWidth, totalTime }" @init="addToStage" />
    <midi-keyboard v-bind="{ pixelPerNoteNumber, midiKeyboardWidth }" @init="addToStage" />
    <bg-grid v-bind="{ pixelPerTick, pixelPerNoteNumber, totalTime, midiKeyboardWidth, rulerHeight }" @init="addToStage" />
    <note-layer v-bind="{ pixelPerTick, pixelPerNoteNumber }" @init="addToStage" />
    <automation-lane v-bind="{ automationLaneHeight, midiKeyboardWidth }" @init="addToStage" />
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
import {
  NOTE_LAYER,
  BG_GRID,
  PLAYBACK_LINE,
  MIDI_KEYBOARD,
  AUTOMATION_LANE,
  RULER,
  AUTOMATION_LANE_SELECTOR, RULER_BG
} from '../constants/pixi-section-types';
import { debounce } from 'lodash';

export default {
  props: {
    mouseMode: String
  },
  data () {
    return {
      pixelPerTick: 1,
      pixelPerNoteNumber: 4,
      midiKeyboardWidth: 100,
      rulerHeight: 30,
      automationLaneHeight: 100,
      stageHeight: 300,
      stageWidth: 500,
      totalBars: 1.5
    };
  },
  created () {
    this.resize = debounce(this._notDebouncedResize, 120);
    window.addEventListener('resize', this.resize);
  },
  mounted () {
    this.initApp();
    this.initScrollEvent();
    this.initKeyboard();
    this.updateStageWidthAndHeight();
    this.pixelPerNoteNumber = this.minPixelPerNoteNumber;
  },
  computed: {
    totalTime () {
      return this.totalBars * 4 * this.$store.state.tpb;
    },
    rulerWidth () {
      return this.totalTime * this.pixelPerTick;
    },
    midiKeyboardHeight () {
      return 127 * this.pixelPerNoteNumber;
    },
    minRulerWidth () {
      return this.stageWidth - this.midiKeyboardWidth;
    },
    minMidiKeyboardHeight () {
      return this.stageHeight - this.rulerHeight - this.automationLaneHeight;
    },
    minPixelPerTick () {
      return this.minRulerWidth / this.totalTime;
    },
    minPixelPerNoteNumber () {
      return this.minMidiKeyboardHeight / 127;
    }
  },
  methods: {
    /** @param {PIXI.Container} pixiSection **/
    addToStage (pixiSection) {
      const positioned = this.positionPixiSections(pixiSection);
      if (positioned) this.app.stage.addChild(positioned);
    },
    /** @param {PIXI.Container} section **/
    positionPixiSections (section) {
      switch (section.type) {
        case NOTE_LAYER:
          section.position.set(this.midiKeyboardWidth, this.rulerHeight);
          section.zIndex = 1;
          section.on('scroll', e => this.handleScroll(e, section));
          return section;
        case MIDI_KEYBOARD:
          section.position.set(0, this.rulerHeight);
          section.zIndex = 4;
          section.on('scroll', e => this.handleVerticalScroll(e, section));
          return section;
        case RULER:
          section.position.set(this.midiKeyboardWidth, 0);
          section.zIndex = 10;
          section.on('scroll', e => this.handleHorizontalScroll(e, section));
          return section;
        case RULER_BG:
          section.position.set(0, 0);
          section.zIndex = 9;
          return section;
        case AUTOMATION_LANE:
          section.position.set(this.midiKeyboardWidth, this.stageHeight - this.automationLaneHeight);
          section.zIndex = 7;
          section.on('scroll', e => this.handleHorizontalScroll(e, section));
          return section;
        case AUTOMATION_LANE_SELECTOR:
          console.log(this.stageHeight);
          section.position.set(0, this.stageHeight - this.automationLaneHeight);
          section.zIndex = 6;
          return section;
        case BG_GRID:
          section.position.set(this.midiKeyboardWidth, this.rulerHeight);
          section.zIndex = 0;
          section.on('scroll', e => this.handleScroll(e, section));
          return section;
        case PLAYBACK_LINE:
          section.position.set(this.midiKeyboardWidth, this.rulerHeight);
          section.zIndex = 3;
          return section;
      }
    },
    initScrollEvent () {
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
      this.app.stage.sortableChildren = true;
      this.app.ticker.maxFPS = 5;
      this.$refs.pixiContainer.appendChild(this.app.view);
    },
    initKeyboard () {
      hotkeys('h', this.horizontalZoomIn);
      hotkeys('g', this.horizontalZoomOut);
      hotkeys('shift+h', this.vericalZoomIn);
      hotkeys('shift+g', this.verticalZoomOut);
    },
    horizontalZoomIn () {
      this.pixelPerTick = this.pixelPerTick * 1.2;
    },
    horizontalZoomOut () {
      this.pixelPerTick = Math.max(this.pixelPerTick / 1.2, this.minPixelPerTick);
    },
    vericalZoomIn () {
      this.pixelPerNoteNumber = this.pixelPerNoteNumber * 1.2;
    },
    verticalZoomOut () {
      this.pixelPerNoteNumber = Math.max(this.pixelPerNoteNumber / 1.2, this.minPixelPerNoteNumber);
    },
    handleScroll (event, section) {
      this.handleHorizontalScroll(event, section);
      this.handleVerticalScroll(event, section);
    },
    handleHorizontalScroll (event, section) {
      const targetX = section.x + event.wheelDeltaX * 0.5;
      if (targetX + this.rulerWidth < this.stageWidth) {
        // Not to make a blank between midiKeyboard and Automation Selector
        section.position.x = this.stageWidth - this.rulerWidth;
        return;
      }
      if (targetX > this.midiKeyboardWidth) {
        // Not to make a blank between midiKeyboard and Automation Selector
        section.position.x = Number(this.midiKeyboardWidth);
        return;
      }
      section.position.x = targetX;
    },
    handleVerticalScroll (event, section) {
      const targetY = section.y + event.wheelDeltaY * 0.5;
      if (targetY + this.midiKeyboardHeight < this.stageHeight - this.automationLaneHeight) {
        // Not to make blank between midiKeyboard and Automation Selector
        section.position.y = this.stageHeight - this.automationLaneHeight - this.midiKeyboardHeight;
        return;
      }
      if (targetY > this.rulerHeight) {
        // Not to make blank between midiKeyboard and Automation Selector
        section.position.y = Number(this.rulerHeight);
        return;
      }
      section.position.y = targetY;
    },
    updateStageWidthAndHeight () {
      console.log(this.stageWidth, this.stageHeight);
      this.stageWidth = Number(this.$refs.pixiContainer.clientWidth);
      this.stageHeight = Number(this.$refs.pixiContainer.clientHeight);
    },
    /** Do not use this method. Use `resize()` */
    _notDebouncedResize () {
      this.pixelPerNoteNumber = this.minPixelPerNoteNumber;
      this.updateStageWidthAndHeight();
      this.app.stage.children.forEach(section => {
        switch (section.type) {
          case AUTOMATION_LANE:
            section.position.y = this.stageHeight - this.automationLaneHeight;
            break;
          case AUTOMATION_LANE_SELECTOR:
            section.position.y = this.stageHeight - this.automationLaneHeight;
            break;
        }
      });
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
