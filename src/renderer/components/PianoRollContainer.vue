<template>
    <div ref="pianoRollContainer" class="piano-roll-container">
        <piano-roll ref="pianoRoll" :total-beats="totalBeats" :total-bars="totalBars"/>
    </div>
</template>

<script>
import PianoRoll from './PianoRoll';
import { ADD_NOTE } from '../store/action-types';
import mockState from '../../../test/data/mockState';
import { APPEND_NOTE, INSERT_MODULATION, SET_NOTE_OFF, DELETE_NOTE } from '../store/mutation-types';

export default {
  data () {
    return {
      totalBeats: 32,
      totalBars: 8
    };
  },
  mounted () {
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
            this.$refs.pianoRoll.addNote(mutation.payload);
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
  },
  components: {
    PianoRoll
  }
};
</script>

<style scoped>
.piano-roll-container{
    height: 60vh;
}
</style>

