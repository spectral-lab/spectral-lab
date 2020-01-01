<template>
  <div
    ref="noteContainer"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    class="note-container"
  >
    <slot />
  </div>
</template>
<script>
// @flow
import { Note, NoteOff, Modulation } from '../../models';
import { PEN, SELECT } from '../../../constants/mouse-modes';
import uid from 'uid';
import { posXToTick, posYToPitch } from '../../utils/view/pianoRoll/utils';
import { pitchToNoteNumberAndPitchBend } from '../../utils/helpers';
import Vue from 'vue';

export default Vue.extend({
  props: {
    totalTicks: {
      type: Number,
      default: 7680
    },
    mouseMode: {
      type: String,
      default: SELECT
    },
    idOfClipBeingEdited: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      drawingNote: null
    };
  },
  computed: {
    drawing () {
      return Boolean(this.drawingNote);
    },
    noteContainer () {
      return this.$refs.noteContainer;
    }
  },
  methods: {
    handleMouseDown (ev) {
      if (!this.idOfClipBeingEdited) return;
      if (!this.noteContainer) return;
      if (this.mouseMode !== PEN) return;
      const offsetTime = posXToTick(ev.offsetX / this.noteContainer.offsetWidth, this.totalTicks);
      const { noteNumber, pitchBend } = pitchToNoteNumberAndPitchBend(
        posYToPitch(ev.offsetY / this.noteContainer.offsetHeight)
      );
      this.drawingNote = {
        id: uid(),
        offsetTime,
        noteNumber
      };
      Note.insert({
        data: {
          id: this.drawingNote.id,
          clipId: this.idOfClipBeingEdited,
          offsetTime,
          noteNumber,
          noteOn: {
            id: uid(),
            pitchBend
          }
        }
      });
    },
    handleMouseMove (ev) {
      if (!this.drawing) return;
      if (!this.noteContainer) return;
      const offsetTime = posXToTick(ev.offsetX / this.noteContainer.offsetWidth, this.totalTicks);
      const pitch = posYToPitch(ev.offsetY / this.noteContainer.offsetHeight);
      Modulation.insert({
        data: {
          id: uid(),
          noteId: this.drawingNote.id,
          offsetTime: offsetTime - this.drawingNote.offsetTime,
          pitchBend: pitch - this.drawingNote.noteNumber
        }
      });
    },
    handleMouseUp (ev) {
      if (!this.drawing) return;
      if (!this.noteContainer) return;
      const offsetTime = posXToTick(ev.offsetX / this.noteContainer.offsetWidth, this.totalTicks);
      const pitch = posYToPitch(ev.offsetY / this.noteContainer.offsetHeight);
      NoteOff.insert({
        data: {
          id: uid(),
          noteId: this.drawingNote.id,
          offsetTime: offsetTime - this.drawingNote.offsetTime,
          pitchBend: pitch - this.drawingNote.noteNumber
        }
      });
      this.drawingNote = null;
    }
  }
});
</script>

<style scoped>
  .note-container {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
