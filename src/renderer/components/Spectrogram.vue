<template>
  <div
    :style="{
      width: width,
    }"
    class="spectrogram"
  >
    <canvas
      ref="canvas"
      class="canvas"
      width="1920"
      height="1080"
    />
  </div>
</template>

<script>
import renderSpectrogram from '../utils/view/renderSpectrogram';
import { Spectrogram } from '../store/models';
export default {
  props: {
    spectrogram: {
      type: Spectrogram,
      default: null
    },
    totalTicks: {
      type: Number,
      default: 0
    }
  },
  computed: {
    spectrogramDuration () {
      if (!this.spectrogram) return 0;
      return this.spectrogram.times[this.spectrogram.times.length - 1];
    },
    width () {
      return `${this.spectrogramDuration / this.totalTicks * 100}%`;
    }
  },
  watch: {
    spectrogram: {
      handler () {
        this.render();
      },
      deep: true
    }
  },
  mounted () {
    this.render();
  },
  methods: {
    render () {
      renderSpectrogram(this.spectrogram, this.$refs.canvas);
    }
  }
};
</script>

<style scoped>
    .spectrogram {
        height: 100%;
        position: absolute;
    }
    .canvas {
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>
