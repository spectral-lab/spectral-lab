<template>
  <div id="buttonContainer" @click="handleClick" class="play-button">
    <img v-if="!playing" src="../assets/play.svg" alt="play">
    <img v-if="playing" src="../assets/stop.svg" alt="stop">
  </div>
</template>

<script>
import { playAudioBuffer } from '../utils/helpers'
export default {
  data: function () {
    return {
      source: null
    }
  },
  computed: {
    playing: function () {
      return this.source != null
    }
  },
  methods: {
    handleClick () {
      if (this.source != null) {
        this.source.stop()
        this.source = null
        return
      }
      const ab = this.$store.state.sourceAudioBuffer
      this.source = playAudioBuffer(ab)
      this.source.onended = () => {
        if (this.source != null) {
          this.source = null
        }
      }
    }
  }
}
</script>

<style scoped>
#buttonContainer {
  height: 64px;
}
img {
  height: 100%;
}
</style>
