<template>
    <div ref="pianoRollContainer" class="piano-roll-container"></div>
</template>

<script>
import pianoRoll from '../modules/pianoRoll';
import { ADD_NOTE } from '../store/action-types';
import mockState from '../../../test/data/mockState';
import { APPEND_NOTE, INSERT_MODULATION, SET_NOTE_OFF, DELETE_NOTE } from '../store/mutation-types';

export default {
  mounted () {
    this.pianoRoll = pianoRoll();
    this.$refs.pianoRollContainer.appendChild(this.pianoRoll.view);
    this.subscribeNotes();
    this.loadMockNotes();
  },
  beforeDestroy () {
    this.unsubscribe();
  },
  methods: {
    subscribeNotes () {
      this.unsubscribe = this.$store.subscribe((mutation) => {
        switch (mutation.type) {
          case APPEND_NOTE:
            this.pianoRoll.addNote(mutation.payload);
            break;
          case INSERT_MODULATION:
            break;
          case SET_NOTE_OFF:
            break;
          case DELETE_NOTE:
            break;
        }
      });
    },
    loadMockNotes () {
      mockState.notes.data.forEach(note => {
        this.$store.dispatch(ADD_NOTE, note);
      });
    }
  }
};
</script>

<style scoped>
.piano-roll-container{
    height: 60vh;
}
</style>

