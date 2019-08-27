<template>
  <div
    ref="rulerContainer"
    class="ruler-container"
  >
    <grid-column-container
      :total-bars="totalBars"
      :beats-per-bar="beatsPerBar"
      :show-number="true"
    />
  </div>
</template>
<script>
import { PianoRoll } from '../../store/models';
import GridColumnContainer from './GridColumnContainer';
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
    .ruler-container {
        height: 100%;
        width: 100%;
        background: rgb(100, 112, 114);
        position: absolute;
    }
</style>
