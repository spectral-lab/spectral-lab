<template>
  <div
    ref="midiKeyboard"
    class="midi-keyboard scrollbar-hidden"
  >
    <midi-keyboard />
  </div>
</template>

<script>
import MidiKeyboard from './MidiKeyboard';

export default {
  components: {
    MidiKeyboard
  }
};
</script>

<style scoped>
  .midi-keyboard {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
