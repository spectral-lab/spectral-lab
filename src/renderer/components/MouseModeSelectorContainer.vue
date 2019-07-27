<template>
    <mouse-mode-selector @mouse-mode="handleMouseMode"/>
</template>

<script>
  import MouseModeSelector from './MouseModeSelector';
  import { PianoRoll } from '../store/models';
  export default {
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
    },
    components: {
      MouseModeSelector
    }
  };
</script>

<style scoped>

</style>
