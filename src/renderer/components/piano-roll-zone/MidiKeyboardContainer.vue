<template>
  <div
    ref="midiKeyboardContainer"
    class="midi-keyboard-container scrollbar-hidden"
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
  .midi-keyboard-container {
    width: 100%;
    height: 100%;
  }
</style>
