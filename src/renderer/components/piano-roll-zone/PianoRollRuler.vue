<template>
  <div
    class="piano-roll-ruler"
  >
    <grid-column-container
      :total-bars="totalBars"
      :beats-per-bar="beatsPerBar"
    />
  </div>
</template>
<script>
import GridColumnContainer from '../misc/GridColumnContainer';
import Vue from 'vue';

export default Vue.extend({
  components: {
    GridColumnContainer
  },
  props: {
    totalBars: {
      type: Number,
      default: 4
    },
    beatsPerBar: {
      type: Number,
      default: 4
    }
  }
});
</script>

<style scoped>
    .piano-roll-ruler {
        height: 100%;
        width: 100%;
        background: rgb(100, 112, 114);
        position: absolute;
    }
</style>
