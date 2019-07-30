<template>
  <div class="automation-display">
    <grid-column-container
      :total-bars="totalBars"
      :beats-per-bar="beatsPerBar"
    />
  </div>
</template>

<script>
import GridColumnContainer from './GridColumnContainer';
import { PianoRoll } from '../store/models';
export default {
  components: {
    GridColumnContainer
  },
  computed: {
    pianoRoll () {
      return PianoRoll.query().last();
    },
    totalBars () {
      return this.pianoRoll.totalBars;
    },
    beatsPerBar () {
      return this.pianoRoll.beatsPerBar;
    }
  }
};
</script>

<style scoped>
  .automation-display {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
