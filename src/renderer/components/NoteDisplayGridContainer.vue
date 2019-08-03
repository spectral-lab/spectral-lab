<template>
  <div
    :style="{ opacity: gridOpacity }"
    class="grid-container"
  >
    <grid-row-container />
    <grid-column-container
      :beats-per-bar="beatsPerBar"
      :total-bars="totalBars"
    />
  </div>
</template>

<script>
import GridRowContainer from './GridRowContainer';
import GridColumnContainer from './GridColumnContainer';
import { PianoRoll } from '../store/models';

export default {
  components: {
    GridRowContainer,
    GridColumnContainer
  },
  computed: {
    beatsPerBar () {
      return this.pianoRoll.beatsPerBar;
    },
    totalBars () {
      return this.pianoRoll.totalBars;
    },
    pianoRoll () {
      return PianoRoll.query().first();
    },
    gridOpacity () {
      return this.pianoRoll.gridOpacity;
    }
  }
};
</script>

<style scoped>
  .grid-container {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
