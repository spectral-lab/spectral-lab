<template>
  <div
    :style="{ willChange: willChange, opacity: opacity }"
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
    opacity () {
      return this.pianoRoll.gridOpacity;
    },
    willChange () {
      if (this.pianoRoll.opacityWillChange) return 'opacity';
      return `auto`;
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
