<template>
  <div
    :style="{
      willChange: willChange,
      opacity: opacity
    }"
    class="spectrogram-container"
  >
    <div
      v-for="spectrogram in spectrograms"
      :key="spectrogram.id"
      class="spectrogram-wrapper"
    >
      <spectrogram
        :spectrogram="spectrogram"
        :total-ticks="totalTicks"
      />
    </div>
  </div>
</template>

<script>
import Spectrogram from './Spectrogram';

export default {
  components: {
    Spectrogram
  },
  props: {
    spectrograms: {
      type: Array,
      default: () => []
    },
    opacity: {
      type: Number,
      default: 1
    },
    opacityWillChange: {
      type: Boolean,
      default: false
    },
    totalTicks: {
      type: Number,
      default: 7680
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
    .spectrogram-container {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .spectrogram-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>
