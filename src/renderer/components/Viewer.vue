<template>
  <div class="container">
    <canvas class="spectrogram" ref="spectrogram" width="1920" height="1080" />
  </div>
</template>

<script>
import { renderSpectrogram } from '../utils/render';
export default {
  mounted () {
    this.$store.watch(
      (state) => state.spectrogram,
      (newSpectrogram) => {
        renderSpectrogram(newSpectrogram, this.$refs.spectrogram);
      },
      { deep: true }
    );
  }
};
</script>

<style scoped>
.container {
  background: black;
}
.spectrogram {
  width: 100%;
  height: 100%;
}
</style>


