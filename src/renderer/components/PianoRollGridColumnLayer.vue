<template>
    <div ref="gridColumnLayer" class="grid-column-layer">
        <div class="beat-layer">
            <div v-for="beat in totalBeats" class="grid-item-container">
                <piano-roll-grid-column-item :is-visible="showBeats" color="DimGray"/>
            </div>
        </div>
        <div class="bar-layer">
            <div v-for="bar in totalBars" class="grid-item-container">
                <piano-roll-grid-column-item :is-visible="showBars" color="DarkGray"/>
                <div v-if="showNumber" class="number-box">{{bar}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import pianoRollGridColumnItem from './PianoRollGridColumnItem';
import elementResizeDetector from 'element-resize-detector';
export default {
  props: {
    totalBeats: Number,
    totalBars: Number,
    showNumber: Boolean
  },
  data () {
    return {
      width: 0
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
    elementResizeDetector({ strategy: 'scroll' }).listenTo(this.$refs.gridColumnLayer, (element) => {
      this.width = element.offsetWidth;
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
        overflow: hidden;
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
    .number-box {
        position: absolute;
        width: 100%;
        height: 50%;
        top: 50%;
        left: 8px;
        font-size: 12px;
        color: lightgrey;
    }
    .grid-item-container {
        flex: 1 1;
        height: 100%;
        position: relative;
    }
</style>
