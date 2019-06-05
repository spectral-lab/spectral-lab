<template>
  <v-footer app fixed>
    <v-spacer />
    <v-btn
      v-for="icon in icons"
      :key="icon"
      icon
    >
      <v-icon size="28px">{{ icon }}</v-icon>
    </v-btn>
    <v-spacer />
  </v-footer>
</template>

<script>
import { playAudioBuffer } from '../utils/helpers';
export default {
  data: function () {
    return {
      source: null,
      icons: [
        'play_arrow',
        'stop',
        'fiber_manual_record'
      ]
    };
  },
  computed: {
    playing: function () {
      return this.source != null;
    }
  },
  methods: {
    handleClick () {
      if (this.source != null) {
        this.source.stop();
        this.source = null;
        return;
      }
      const ab = this.$store.state.sourceAudioBuffer;
      this.source = playAudioBuffer(ab);
      this.source.onended = () => {
        if (this.source != null) {
          this.source = null;
        }
      };
    }
  }
};
</script>

<style scoped>
#buttonContainer {
  height: 64px;
}
img {
  height: 100%;
}
</style>
