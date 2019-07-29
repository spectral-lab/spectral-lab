<template>
  <div
    ref="noteGridLayer"
    class="grid-layer"
    :style="{ opacity: gridOpacity }"
  >
    <piano-roll-grid-row-layer />
    <piano-roll-grid-column-layer
      :beats-per-bar="beatsPerBar"
      :total-bars="totalBars"
    />
  </div>
</template>

<script>
import PianoRollGridRowLayer from './PianoRollGridRowLayer';
import PianoRollGridColumnLayer from './PianoRollGridColumnLayer';
import { PianoRoll } from '../store/models';

export default {
  components: {
    PianoRollGridRowLayer,
    PianoRollGridColumnLayer
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
  .grid-layer {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
