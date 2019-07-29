<template>
  <div
    ref="noteLayer"
    class="note-container"
  >
    <svg
      width="100%"
      height="100%"
    >
      <piano-roll-note
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :total-ticks="totalTicks"
        :selected-note-ids="selectedNoteIds"
        :editing-note-id="editingNoteId"
        @click="handleClickNote"
        @dblclick="handleDblClickNote"
      />
    </svg>
  </div>
</template>

<script>
import PianoRollNote from './PianoRollNote';
import { Note, PianoRoll } from '../store/models';
export default {
  components: {
    PianoRollNote
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
