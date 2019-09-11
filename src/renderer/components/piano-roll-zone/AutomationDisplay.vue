<template>
  <div class="automation-display">
    <grid-vertical-lines-layout
      :clips="clips"
      :duration="totalTicks"
      :start-time="startTime"
    />
  </div>
</template>

<script>
import { beatsPerBar, ticksPerBeat } from '../../../constants/defaults';
import GridVerticalLinesLayout from '../misc/GridVerticalLinesLayout';
export default {
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
      default: 4 * ticksPerBeat * beatsPerBar
    },
    startTime: {
      type: Number,
      default: 0
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
