<template>
  <div
    ref="noteLayer"
    class="note-container"
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
import { Note, PianoRoll } from '../store/models';
import hotkeys from 'hotkeys-js';
import { DESELECT_NOTES } from '../constants/key-bindings';

export default {
  components: {
    NoteItem
  },
  data () {
    return {
      editingNoteId: null
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
    }
  },
  deselectNotes () {
    this.editingNoteId = null;
    Note.update({
      where: note => note.selected,
      data: {
        selected: false
      }
    });
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
