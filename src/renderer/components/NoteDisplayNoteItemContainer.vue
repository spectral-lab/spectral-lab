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
        :note="note"
        :total-ticks="totalTicks"
        :is-selected="isSelected(note)"
        :is-edited="isEdited(note)"
        @click="handleClick"
        @dblclick="handleDblClick"
      />
    </svg>
  </div>
</template>

<script>
import NoteItem from './NoteItem';
import { Note, PianoRoll } from '../store/models';
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
    handleDblClick (ev, { target, id }) {
      if (target === 'NOTE') this.editingNoteId = id;
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
