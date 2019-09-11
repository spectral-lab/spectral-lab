<template>
  <div
    class="piano-roll-ruler"
  >
    <grid-vertical-lines-layout
      :clips="clips"
      :duration="totalTicks"
      :startTime="startTime"
    />
  </div>
</template>
<script>
import GridVerticalLinesLayout from '../misc/GridVerticalLinesLayout';
import Vue from 'vue';

export default Vue.extend({
  components: {
    GridVerticalLinesLayout
  },
  props: {
    clips: {
      type: Array,
      default: () => []
    },
    totalTicks: {
      type: Number,
      default: 1
    },
    startTime: {
      type: Number,
      default: 0
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
