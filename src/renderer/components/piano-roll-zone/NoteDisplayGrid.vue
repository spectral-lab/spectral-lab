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

export default {
  components: {
    GridRowContainer,
    GridColumnContainer
  },
  props: {
    beatsPerBar: {
      type: Number,
      default: 4
    },
    totalBars: {
      type: Number,
      default: 4
    },
    opacity: {
      type: Number,
      default: 1
    },
    opacitywillChange: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    willChange () {
      if (this.opacityWillChange) return 'opacity';
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
