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
import Vue from 'vue';
import { contextMenuEventHub } from '../../modules/container';
import { NOTE } from '../../../constants/model-types';
import { getPianoRollData, setIdOfNoteInEdit } from '../../interactors/PianoRoll';
import { addNoteToSelection, selectSingleNote } from '../../usecases/pianoRoll';

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
  methods: {
    isEdited (note) {
      return this.idOfNoteInEdit === note.id;
    },
    handleClick (ev, id) {
      if (!ev.metaKey && !ev.shiftKey) return selectSingleNote(id);
      return addNoteToSelection(id);
    },
    handleDblClick (ev, id) {
      setIdOfNoteInEdit(id);
    },
    handleContextMenu (ev, id) {
      contextMenuEventHub.emit(ev, { id, context: NOTE });
    }
  }
});
</script>

<style scoped>
</style>
