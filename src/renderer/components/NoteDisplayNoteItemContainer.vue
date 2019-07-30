<template>
  <div
    ref="noteContainer"
    class="note-container"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <svg
      width="100%"
      height="100%"
    >
      <note-item
        v-for="note in notes"
        :key="note.id"
        :note-id="note.id"
        :pitch-transition="note.pitchTransition"
        :total-ticks="totalTicks"
        :is-selected="isSelected(note)"
        :is-edited="isEdited(note)"
        :color="note.parent.color"
        @click="handleClick"
        @dblclick="handleDblClick"
      />
    </svg>
  </div>
</template>

<script>
import NoteItem from './NoteItem';
import { Note, PianoRoll, NoteOff, Modulation } from '../store/models';
import hotkeys from 'hotkeys-js';
import { DESELECT_NOTES } from '../constants/key-bindings';
import { PEN } from '../constants/mouse-modes';
import uid from 'uid';
import { posXToTick, posYToPitch } from '../modules/pianoRoll/utils';
import { pitchToNoteNumberAndPitchBend } from '../modules/helpers';

export default {
  components: {
    NoteItem
  },
  data () {
    return {
      editingNoteId: null,
      drawingNote: null
    };
  },
  computed: {
    pianoRoll () {
      return PianoRoll.query().last();
    },
    notes () {
      return this.pianoRoll.notes;
    },
    totalTicks () {
      return this.pianoRoll.totalTicks;
    },
    beatsPerBar () {
      return this.pianoRoll.beatsPerBar;
    },
    totalBars () {
      return this.pianoRoll.totalBars;
    },
    selectedNoteIds () {
      return this.pianoRoll.selectedNoteIds;
    },
    drawing () {
      return Boolean(this.drawingNote);
    }
  },
  mounted () {
    hotkeys(DESELECT_NOTES.keys, DESELECT_NOTES.scope, this.deselectNotes);
  },
  methods: {
    isEdited (note) {
      return this.editingNoteId === note.id;
    },
    isSelected (note) {
      return this.selectedNoteIds.includes(note.id);
    },
    handleClick (ev, id) {
      console.log('click');
      if (!ev.metaKey && !ev.shiftKey) {
        this.editingNoteId = null;
        Note.update({
          where: note => note.selected && note.id !== id,
          data: {
            selected: false
          }
        });
      }
      this.editingNoteId = null;
      Note.update({
        where: id,
        data: {
          selected: true
        }
      });
    },
    handleDblClick (ev, id) {
      this.editingNoteId = id;
    },
    deselectNotes () {
      this.editingNoteId = null;
      Note.update({
        where: note => note.selected,
        data: {
          selected: false
        }
      });
    },
    handleMouseDown (ev) {
      if (this.pianoRoll.mouseMode !== PEN) return;
      const offsetTime = posXToTick(ev.offsetX / this.$refs.noteContainer.offsetWidth, this.totalTicks);
      const { noteNumber, pitchBend } = pitchToNoteNumberAndPitchBend(
        posYToPitch(ev.offsetY / this.$refs.noteContainer.offsetHeight)
      );
      this.drawingNote = {
        id: uid(),
        offsetTime,
        noteNumber
      };
      Note.insert({
        data: {
          id: this.drawingNote.id,
          clipId: this.pianoRoll.clips[0].id,
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
      const offsetTime = posXToTick(ev.offsetX / this.$refs.noteContainer.offsetWidth, this.totalTicks);
      const pitch = posYToPitch(ev.offsetY / this.$refs.noteContainer.offsetHeight);
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
      const offsetTime = posXToTick(ev.offsetX / this.$refs.noteContainer.offsetWidth, this.totalTicks);
      const pitch = posYToPitch(ev.offsetY / this.$refs.noteContainer.offsetHeight);
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
};
</script>

<style scoped>
    .note-container {
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>
