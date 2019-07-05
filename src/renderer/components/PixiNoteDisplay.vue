<template />

<script>
import * as PIXI from 'pixi.js';
import { APPEND_NOTE, INSERT_MODULATION, SET_NOTE_OFF, DELETE_NOTE } from '../store/mutation-types';
import { timeToX, pitchToY, createInteractiveCircle } from '../modules/helpers/pianoRollUtils';

/** This Component manages the PIXI Container which represents the Note Display. */
export default {
  props: {
    pixelPerTick: Number,
    pixelPerNoteNumber: Number
  },
  watch: {
    pixelPerTick (val) {
      this.noteDisplay.children.forEach(pixiNote => {
        console.log(pixiNote);
        const transition = this.$store.getters.pitchTransition(pixiNote.noteId);
        pixiNote.children.forEach((noteAction, idx) => {
          if (transition.length <= idx) {
            console.warn(`idx ${idx} exceeds transition length`);
            return;
          }
          const { time } = transition[idx];
          noteAction.x = timeToX(time, val);
        });
      });
    },
    pixelPerNoteNumber (val) {
      this.noteDisplay.children.forEach(pixiNote => {
        const transition = this.$store.getters.pitchTransition(pixiNote.noteId);
        pixiNote.children.forEach((noteAction, idx) => {
          if (transition.length <= idx) {
            console.warn(`idx ${idx} exceeds transition length`);
            return;
          };
          const { pitch } = transition[idx];
          noteAction.y = pitchToY(pitch, val);
        });
      });
    }
  },
  mounted () {
    this.initNoteDisplay();
    this.subscribeNotes();
  },
  methods: {
    initNoteDisplay () {
      this.noteDisplay = new PIXI.Container();
      this.noteDisplay.on('scroll', (ev) => {
        this.noteDisplay.x += ev.wheelDeltaX * 0.5;
        this.noteDisplay.y += ev.wheelDeltaY * 0.5;
      });
      this.noteDisplay.type = 'notedisplay';
      this.$nextTick(() => {
        this.$emit('init', this.noteDisplay);
      });
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
      const pixiNote = new PIXI.Container();
      pixiNote.noteId = note.id;
      this.noteDisplay.addChild(pixiNote);
      const circle = createInteractiveCircle(7, 0xDE3249, () => console.log('dragEnd'));
      circle.x = timeToX(note.noteOn.time, this.pixelPerTick);
      circle.y = pitchToY(note.noteOn.noteNumber + note.noteOn.pitchBend, this.pixelPerNoteNumber);
      pixiNote.addChild(circle);
    },
    drawModulation ({ modulation, id }) {
      if (modulation.pitchBend == null) return;
      const noteId = id;
      const { noteOn } = this.$store.getters.getNoteById(id);
      const pixiNote = this.getContainerByNoteId(noteId);
      const circle = createInteractiveCircle(4, 0xDFF633, () => console.log('dragEnd'));
      const time = noteOn.time + modulation.offsetTime;
      const pitch = noteOn.noteNumber + modulation.pitchBend;
      circle.x = timeToX(time, this.pixelPerTick);
      circle.y = pitchToY(pitch, this.pixelPerNoteNumber);
      pixiNote.addChild(circle);
    },
    drawNoteOff ({ noteOff, id }) {
      const pixiNote = this.getContainerByNoteId(id);
      const circle = createInteractiveCircle(4, 0x223212, () => console.log('dragEnd'));
      const pitchTransition = this.$store.getters.pitchTransition(id);
      const noteOn = pitchTransition[0];
      const time = noteOn.time + noteOff.offsetTime;
      const { pitch } = pitchTransition[pitchTransition.length - 1];
      circle.x = timeToX(time, this.pixelPerTick);
      circle.y = pitchToY(pitch, this.pixelPerNoteNumber);
      pixiNote.addChild(circle);
    },
    removeNote (noteId) {
      this.noteDisplay.removeChild(this.getContainerByNoteId(noteId));
    },
    getContainerByNoteId (noteId) {
      return this.noteDisplay.children.find(pixiNote => pixiNote.noteId === noteId);
    }
  }
};
</script>