<template>
  <mouse-mode-selector @mouse-mode="handleMouseMode" />
</template>

<script>
import MouseModeSelector from './MouseModeSelector';
import { PianoRoll } from '../../models';
import { getPianoRollData } from '../../interactors/PianoRoll';
export default {
  components: {
    MouseModeSelector
  },
  computed: {
    pianoRoll () {
      return getPianoRollData();
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
