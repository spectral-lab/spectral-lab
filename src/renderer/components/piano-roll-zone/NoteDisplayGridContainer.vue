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
import GridRowContainer from '../misc/GridRowContainer';
import GridColumnContainer from '../misc/GridColumnContainer';
import { getPianoRollData } from '../../interactors/PianoRoll';

export default {
  components: {
    GridRowContainer,
    GridColumnContainer
  },
  computed: {
    pianoRoll () {
      return getPianoRollData();
    },
    beatsPerBar () {
      return this.pianoRoll.beatsPerBar;
    },
    totalBars () {
      return this.pianoRoll.totalBars;
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
