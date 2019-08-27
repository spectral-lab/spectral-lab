<template>
  <div
    :style="{
      opacity: spectrogramOpacity
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
import { PianoRoll } from '../../store/models';
import Spectrogram from './Spectrogram';

export default {
  components: {
    Spectrogram
  },
  computed: {
    pianoRoll () {
      return PianoRoll.query().last();
    },
    spectrograms () {
      return this.pianoRoll.spectrograms;
    },
    spectrogramOpacity () {
      return this.pianoRoll.spectrogramOpacity;
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
