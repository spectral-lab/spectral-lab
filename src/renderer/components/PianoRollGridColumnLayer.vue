<template>
    <div ref="gridColumnLayer" class="grid-column-layer">
        <div class="beat-layer">
            <piano-roll-grid-column-item v-for="_ in totalBeats" :is-visible="showBeats" color="DimGray"/>
        </div>
        <div class="bar-layer">
            <piano-roll-grid-column-item v-for="_ in totalBars" :is-visible="showBars" color="DarkGray"/>
        </div>
    </div>
</template>

<script>
import pianoRollGridColumnItem from './PianoRollGridColumnItem';
import elementResizeDetector from 'element-resize-detector';
export default {
  props: {
    totalBeats: Number,
    totalBars: Number
  },
  data () {
    return {
      width: 0,
      height: 0
    };
  },
  computed: {
    showBeats () {
      return this.width > 500;
    },
    showBars () {
      return this.width > 50;
    }
  },
  mounted () {
    const detector = elementResizeDetector({ strategy: 'scroll' });
    detector.listenTo(this.$refs.gridColumnLayer, (element) => {
      this.width = element.offsetWidth;
      this.height = element.offsetHeight;
    });
  },
  components: {
    pianoRollGridColumnItem
  }
};
</script>

<style scoped>
.grid-column-layer {
    position: absolute;
    width: 100%;
    height: 100%;
}
.beat-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
}
.bar-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
