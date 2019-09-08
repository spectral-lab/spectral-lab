<template>
  <piano-roll-layout>
    <template #ruler>
      <ruler-container />
    </template>
    <template #midi-keyboard>
      <midi-keyboard-container />
    </template>
    <template #note-display>
      <note-display />
    </template>
    <template #automation-display>
      <automation-display />
    </template>
  </piano-roll-layout>
</template>

<script>
import PianoRollLayout from './PianoRollLayout';
import NoteDisplay from './NoteDisplay';
import MidiKeyboardContainer from './MidiKeyboardContainer';
import RulerContainer from '../misc/RulerContainer';
import AutomationDisplay from './AutomationDisplay';
import Vue from 'vue';

export default Vue.extend({
  components: {
    PianoRollLayout,
    MidiKeyboardContainer,
    NoteDisplay,
    RulerContainer,
    AutomationDisplay
  }
});

</script>

<style scoped>

</style>
