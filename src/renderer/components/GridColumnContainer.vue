<template>
  <div
    ref="gridColumnContainer"
    class="grid-column-container"
  >
    <div class="beat-layer">
      <div
        v-for="beat in totalBeats"
        :key="beat"
        class="grid-item-container"
      >
        <grid-column
          :is-visible="showBeats"
          color="DimGray"
        />
      </div>
    </div>
    <div class="bar-layer">
      <div
        v-for="bar in totalBars"
        :key="bar"
        class="grid-item-container"
      >
        <grid-column
          :is-visible="showBars"
          color="DarkGray"
        />
        <div
          v-if="showNumber"
          class="number-box"
        >
          {{ bar }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GridColumn from './GridColumn';
import elementResizeDetector from 'element-resize-detector';
export default {
  components: {
    GridColumn
  },
  props: {
    beatsPerBar: Number,
    totalBars: Number,
    showNumber: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      width: 0
    };
  },
  computed: {
    totalBeats () {
      return this.totalBars * this.beatsPerBar;
    },
    showBeats () {
      return this.width > 500;
    },
    showBars () {
      return this.width > 50;
    }
  },
  mounted () {
    elementResizeDetector({ strategy: 'scroll' }).listenTo(this.$refs.gridColumnContainer, (element) => {
      this.width = element.offsetWidth;
    });
  }
};
</script>

<style scoped>
    .grid-column-container {
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
