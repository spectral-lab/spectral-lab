<template>
  <div
    ref="noteContainer"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
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
        :is-edited="isEdited(note)"
        :color="note.parent.color"
        @click="handleClick"
        @dblclick="handleDblClick"
      />
    </svg>
  </div>
</template>

<script>
// @flow
import NoteItem from './NoteItem';
import { Note } from '../../store/models';
import hotkeys from 'hotkeys-js';
import { DESELECT_NOTES } from '../../../constants/key-bindings';
import { drawHandler } from '../../mixins/drawHandler';
import Vue from 'vue';

export default Vue.extend({
  components: {
    NoteItem
  },
  mixins: [drawHandler],
  props: {
    notes: {
      type: Array,
      default: () => []
    },
    totalTicks: {
      type: Number,
      default: 7680
    }
  },
  data () {
    return {
      editingNoteId: null
    };
  },
  computed: {
    noteContainer () {
      return this.$refs.noteContainer;
    }
  },
  mounted () {
    hotkeys(DESELECT_NOTES.keys, DESELECT_NOTES.scope, this.deselectNotes);
  },
  methods: {
    isEdited (note) {
      return this.editingNoteId === note.id;
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
  }
});
</script>

<style scoped>
    .note-container {
        width: 100%;
        height: 100%;
        position: absolute;
    }
   .drawing-canvas {
     width: 100%;
     height: 100%;
     position: absolute;
   }
</style>
