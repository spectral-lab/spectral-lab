<template>
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
</template>

<script>
// @flow
import NoteItem from './NoteItem';
import { Note } from '../../store/models';
import hotkeys from 'hotkeys-js';
import { DESELECT_NOTES } from '../../../constants/key-bindings';
import Vue from 'vue';

export default Vue.extend({
  components: {
    NoteItem
  },
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
      idOfNoteBeingEdited: null
    };
  },
  computed: {
  },
  mounted () {
    hotkeys(DESELECT_NOTES.keys, DESELECT_NOTES.scope, this.deselectNotes);
  },
  methods: {
    isEdited (note) {
      return this.idOfNoteBeingEdited === note.id;
    },
    handleClick (ev, id) {
      if (!ev.metaKey && !ev.shiftKey) {
        this.idOfNoteBeingEdited = null;
        Note.update({
          where: note => note.selected && note.id !== id,
          data: {
            selected: false
          }
        });
      }
      this.idOfNoteBeingEdited = null;
      Note.update({
        where: id,
        data: {
          selected: true
        }
      });
    },
    handleDblClick (ev, id) {
      this.idOfNoteBeingEdited = id;
    },
    deselectNotes () {
      this.idOfNoteBeingEdited = null;
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
</style>
