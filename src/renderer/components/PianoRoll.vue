<template>
  <div ref="pianoRoll" class="piano-roll" />
</template>

<script>
import * as PIXI from 'pixi.js';
import hotkeys from 'hotkeys-js';
import { timeToX, pitchToY, createInteractiveCircle } from '../modules/helpers/pianoRollUtils';
import { APPEND_NOTE, INSERT_MODULATION, SET_NOTE_OFF, DELETE_NOTE } from '../store/mutation-types';

export default {
  props: {
    mouseMode: String,
    areaToDisplay: {
      upperLeftCorner: {
        time: Number,
        pitch: Number
      },
      numberOfSeconds: Number,
      numberOfNoteNumbers: Number
    }
  },
  data () {
    return {
      pixelPerSecond: 500,
      pixelPerNoteNumber: 2
    };
  },
  watch: {
    pixelPerSecond () {
      this.scrollBox.children.forEach(noteContainer => {
        console.log(noteContainer);
        const transition = this.$store.getters.pitchTransition(noteContainer.noteId);
        noteContainer.children.forEach((noteAction, idx) => {
          if (transition.length <= idx) {
            console.warn(`idx ${idx} exceeds transition length`);
            return;
          }
          const { time } = transition[idx];
          noteAction.x = timeToX(time, this.pixelPerSecond);
        });
      });
    },
    pixelPerNoteNumber () {
      this.scrollBox.children.forEach(noteContainer => {
        const transition = this.$store.getters.pitchTransition(noteContainer.noteId);
        noteContainer.children.forEach((noteAction, idx) => {
          if (transition.length <= idx) {
            console.warn(`idx ${idx} exceeds transition length`);
            return;
          };
          const { pitch } = transition[idx];
          noteAction.y = pitchToY(pitch, this.pixelPerNoteNumber);
        });
      });
    }
  },
  mounted () {
    this.initApp();
    this.initScrollBox();
    this.initKeyboard();
    this.subscribeNotes();
    // this.drawPoleStar();
  },
  methods: {
    initApp () {
      PIXI.utils.skipHello();
      this.app = new PIXI.Application({
        backgroundColor: 0x222222,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
        resizeTo: this.$refs.pianoRoll,
        autoDensity: true
      });
      this.app.ticker.maxFPS = 5;
      this.$refs.pianoRoll.appendChild(this.app.view);
    },
    initScrollBox () {
      this.$refs.pianoRoll.addEventListener('wheel', function (event) {
        event.preventDefault();
      });
      this.scrollBox = new PIXI.Container();
      this.scrollBox.on('scroll', (ev) => {
        this.scrollBox.x += ev.wheelDeltaX * 0.5;
        this.scrollBox.y += ev.wheelDeltaY * 0.5;
      });
      this.app.view.addEventListener('wheel', (ev) => {
        this.scrollBox.emit('scroll', ev);
      });
      this.app.stage.addChild(this.scrollBox);
    },
    initKeyboard () {
      hotkeys('h', () => { this.pixelPerSecond = this.pixelPerSecond * 1.2; });
      hotkeys('g', () => { this.pixelPerSecond = this.pixelPerSecond / 1.2; });
      hotkeys('shift+h', () => { this.pixelPerNoteNumber = this.pixelPerNoteNumber * 1.2; });
      hotkeys('shift+g', () => { this.pixelPerNoteNumber = this.pixelPerNoteNumber / 1.2; });
    },
    subscribeNotes () {
      this.unsubscribe = this.$store.subscribe((mutation) => {
        switch (mutation.type) {
          case APPEND_NOTE:
            this.drawNote(mutation.payload);
            break;
          case INSERT_MODULATION:
            this.drawModulation(mutation.payload);
            break;
          case SET_NOTE_OFF:
            this.drawNoteOff(mutation.payload);
            break;
          case DELETE_NOTE:
            this.removeNote(mutation.payload);
            break;
        }
      });
    },
    drawNote (note) {
      const noteContainer = new PIXI.Container();
      noteContainer.noteId = note.id;
      this.scrollBox.addChild(noteContainer);
      const circle = createInteractiveCircle(7, 0xDE3249, () => console.log('dragEnd'));
      circle.x = timeToX(note.noteOn.time, this.pixelPerSecond);
      circle.y = pitchToY(note.noteOn.noteNumber + note.noteOn.pitchBend, this.pixelPerNoteNumber);
      noteContainer.addChild(circle);
    },
    drawModulation ({ modulation, id }) {
      if (modulation.pitchBend == null) return;
      const noteId = id;
      const { noteOn } = this.$store.getters.getNoteById(id);
      const noteContainer = this.getContainerByNoteId(noteId);
      const circle = createInteractiveCircle(4, 0xDFF633, () => console.log('dragEnd'));
      const time = noteOn.time + modulation.offsetTime;
      const pitch = noteOn.noteNumber + modulation.pitchBend;
      circle.x = timeToX(time, this.pixelPerSecond);
      circle.y = pitchToY(pitch, this.pixelPerNoteNumber);
      noteContainer.addChild(circle);
    },
    drawNoteOff ({ noteOff, id }) {
      const noteContainer = this.getContainerByNoteId(id);
      const circle = createInteractiveCircle(4, 0x223212, () => console.log('dragEnd'));
      const pitchTransition = this.$store.getters.pitchTransition(id);
      const noteOn = pitchTransition[0];
      const time = noteOn.time + noteOff.offsetTime;
      const { pitch } = pitchTransition[pitchTransition.length - 1];
      circle.x = timeToX(time, this.pixelPerSecond);
      circle.y = pitchToY(pitch, this.pixelPerNoteNumber);
      noteContainer.addChild(circle);
    },
    removeNote (noteId) {
      this.scrollBox.removeChild(this.getContainerByNoteId(noteId));
    },
    getContainerByNoteId (noteId) {
      return this.scrollBox.children.find(noteContainer => noteContainer.noteId === noteId);
    },
    drawPoleStar () {
      const poleStar = new PIXI.Graphics();
      this.scrollBox.addChild(poleStar);
      poleStar.beginFill(0xFFFFFF);
      poleStar.drawStar(0, 0, 5, 10);
      poleStar.endFill();
    }
  }
};
</script>

<style scoped>
.piano-roll {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
