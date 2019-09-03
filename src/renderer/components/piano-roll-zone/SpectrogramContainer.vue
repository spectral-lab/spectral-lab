<template>
  <div
    :style="{
      willChange: willChange,
      opacity: opacity
    }"
    class="spectrogram-container"
  >
    <div
      v-for="spectrogram in pianoRoll.spectrograms"
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
import { getPianoRollData } from '../../interactors/PianoRoll';

export default {
  components: {
    Spectrogram
  },
  computed: {
    pianoRoll () {
      return getPianoRollData();
    },
    opacity () {
      return this.pianoRoll.spectrogramOpacity;
    },
    willChange () {
      if (this.pianoRoll.opacityWillChange) return 'opacity';
      return `auto`;
    },
    totalTicks () {
      return this.pianoRoll.totalTicks;
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
