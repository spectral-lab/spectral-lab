<template>
  <div
    :style="{ willChange: willChange, opacity: opacity }"
    class="grid-container"
  >
    <grid-row-container />
    <grid-vertical-lines-layout
      :clips="clips"
      :startTime="startTime"
      :duration="totalTicks"
    />
  </div>
</template>

<script>
import GridRowContainer from '../misc/GridRowContainer';
import GridVerticalLinesLayout from '../misc/GridVerticalLinesLayout';
import { beatsPerBar, ticksPerBeat } from '../../../constants/defaults';

export default {
  components: {
    GridRowContainer,
    GridVerticalLinesLayout
  },
  props: {
    opacity: {
      type: Number,
      default: 1
    },
    opacitywillChange: {
      type: Boolean,
      default: false
    },
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
