<template>
  <div
    ref="gridVerticalLinesLayout"
    class="grid-vertical-lines-layout"
  >
    <div
      v-for="clip in clips"
      :key="clip.id"
      class="lines-wrapper"
    >
      <div
        v-show="showBeats"
        class="lines-wrapper"
      >
        <grid-vertical-lines
          :source-items="clip.beats"
          :duration="duration"
          :start-time="startTime"
        />
      </div>
      <div class="lines-wrapper">
        <grid-vertical-lines
          :source-items="clip.bars"
          :duration="duration"
          :start-time="startTime"
          color="lightgrey"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GridVerticalLines from './GridVerticalLines';
import elementResizeDetector from 'element-resize-detector';
export default {
  components: {
    GridVerticalLines
  },
  props: {
    clips: {
      type: Array,
      default: () => []
    },
    startTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      width: 0
    };
  },
  computed: {
    pixelsPerTick () {
      if (!this.duration) return 0;
      return this.width / this.duration;
    },
    showBeats () {
      return this.pixelsPerTick > 0.03;
    }
  },
  mounted () {
    elementResizeDetector({ strategy: 'scroll' })
      .listenTo(this.$refs.gridVerticalLinesLayout, (element) => {
        this.width = element.offsetWidth;
      });
  }
};
</script>

<style scoped>
  .grid-vertical-lines-layout {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .lines-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
