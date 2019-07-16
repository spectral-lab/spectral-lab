<template>
    <div ref="pianoRollContainer" class="piano-roll-container">
        <piano-roll ref="pianoRoll" :total-beats="totalBeats" :total-bars="totalBars" :notes="notes"/>
    </div>
</template>

<script>
import PianoRoll from './PianoRoll';
import { ADD_NOTE } from '../store/action-types';
import mockState from '../../../test/data/mockState';

export default {
  data () {
    return {
      totalBeats: 32,
      totalBars: 8
    };
  },
  computed: {
    notes () {
      return this.$store.state.notes.data;
    }
  },
  mounted () {
    this.loadMockNotes();
  },
  methods: {
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

