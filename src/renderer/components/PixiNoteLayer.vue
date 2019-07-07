<template />

<script>
import * as PIXI from 'pixi.js';
import { APPEND_NOTE, INSERT_MODULATION, SET_NOTE_OFF, DELETE_NOTE } from '../store/mutation-types';
import { ADD_NOTE } from '../store/action-types';
import { timeToX, pitchToY, createInteractiveCircle } from '../modules/helpers/pianoRollUtils';
import mockState from '../../../test/data/mockState.json';
import { NOTE_LAYER } from '../constants/pixi-section-types';

/** This Component manages the PIXI Container which represents the Note Display. */
export default {
  props: {
    pixelPerTick: Number,
    pixelPerNoteNumber: Number
  },
  watch: {
    pixelPerTick (val) {
      this.noteLayer.children.forEach(pixiNote => {
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
      this.noteLayer.children.forEach(pixiNote => {
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
    this.initNoteLayer();
    this.subscribeNotes();
    this.loadMockNotes();
  },
  beforeDestroy () {
    this.unsubscribe();
  },
  methods: {
    initNoteLayer () {
      this.noteLayer = new PIXI.Container();
      this.noteLayer.type = NOTE_LAYER;
      this.$nextTick(() => {
        this.$emit('init', this.noteLayer);
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
      this.noteLayer.addChild(pixiNote);
      this.drawNoteOn({ noteOn: note.noteOn, id: note.id });
      note.modulations.forEach(modulation => this.drawModulation({ modulation, id: note.id }));
      this.drawNoteOff({ noteOff: note.noteOff, id: note.id });
    },
    drawNoteOn ({ noteOn, id }) {
      const pixiNote = this.getPixiNoteById(id);
      const circle = createInteractiveCircle(7, 0xDE3249, () => console.log('dragEnd'));
      circle.x = timeToX(noteOn.time, this.pixelPerTick);
      circle.y = pitchToY(noteOn.noteNumber + noteOn.pitchBend, this.pixelPerNoteNumber);
      pixiNote.addChild(circle);
    },
    drawModulation ({ modulation, id }) {
      if (modulation.pitchBend == null) return;
      const { noteOn } = this.$store.getters.getNoteById(id);
      const pixiNote = this.getPixiNoteById(id);
      const circle = createInteractiveCircle(4, 0xDFF633, () => console.log('dragEnd'));
      const time = noteOn.time + modulation.offsetTime;
      const pitch = noteOn.noteNumber + modulation.pitchBend;
      circle.x = timeToX(time, this.pixelPerTick);
      circle.y = pitchToY(pitch, this.pixelPerNoteNumber);
      pixiNote.addChild(circle);
    },
    drawNoteOff ({ noteOff, id }) {
      if (noteOff == null) return;
      const pixiNote = this.getPixiNoteById(id);
      const circle = createInteractiveCircle(4, 0x223212, () => console.log('dragEnd'));
      const pitchTransition = this.$store.getters.pitchTransition(id);
      const noteOn = pitchTransition[0];
      const time = noteOn.time + noteOff.offsetTime;
      const { pitch } = pitchTransition[pitchTransition.length - 1];
      circle.x = timeToX(time, this.pixelPerTick);
      circle.y = pitchToY(pitch, this.pixelPerNoteNumber);
      pixiNote.addChild(circle);
    },
    loadMockNotes () {
      mockState.notes.data.forEach(note => {
        this.$store.dispatch(ADD_NOTE, note);
      });
    },
    removeNote (noteId) {
      this.noteLayer.removeChild(this.getPixiNoteById(noteId));
    },
    getPixiNoteById (noteId) {
      return this.noteLayer.children.find(pixiNote => pixiNote.noteId === noteId);
    }
  }
};
</script>