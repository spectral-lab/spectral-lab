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
      @contextmenu="handleContextMenu"
    />
  </svg>
</template>

<script>
// @flow
import NoteItem from './NoteItem';
import { Note, PianoRoll } from '../../store/models';
import hotkeys from 'hotkeys-js';
import { DESELECT_NOTES } from '../../../constants/key-bindings';
import Vue from 'vue';
import { contextMenuEventHub } from '../../modules';
import { NOTE } from '../../../constants/model-types';
import { getPianoRollData, setIdOfNoteInEdit } from '../../interactors/PianoRoll';

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
  computed: {
    idOfNoteInEdit () {
      return getPianoRollData().idOfNoteInEdit;
    }
  },
  mounted () {
    hotkeys(DESELECT_NOTES.keys, DESELECT_NOTES.scope, this.deselectNotes);
  },
  methods: {
    isEdited (note) {
      return this.idOfNoteInEdit === note.id;
    },
    handleClick (ev, id) {
      if (!ev.metaKey && !ev.shiftKey) {
        setIdOfNoteInEdit(null);
        Note.update({
          where: note => note.selected && note.id !== id,
          data: {
            selected: false
          }
        });
      }
      setIdOfNoteInEdit(null);
      Note.update({
        where: id,
        data: {
          selected: true
        }
      });
    },
    handleDblClick (ev, id) {
      setIdOfNoteInEdit(id);
    },
    handleContextMenu (ev, id) {
      contextMenuEventHub.emit(ev, { id, context: NOTE });
    },
    deselectNotes () {
      setIdOfNoteInEdit(null);
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
