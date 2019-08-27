<template>
  <mouse-mode-selector @mouse-mode="handleMouseMode" />
</template>

<script>
import MouseModeSelector from './MouseModeSelector';
import { PianoRoll } from '../../store/models';
export default {
  components: {
    MouseModeSelector
  },
  computed: {
    pianoRoll () {
      return PianoRoll.query().first();
    }
  },
  methods: {
    handleMouseMode (m) {
      PianoRoll.update({
        where: this.pianoRoll.id,
        data: {
          mouseMode: m
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
