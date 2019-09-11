<template>
  <piano-roll-layout>
    <template #ruler>
      <piano-roll-ruler
        :clips="pianoRoll.clips"
        :totalTicks="pianoRoll.totalTicks"
        :startTime="pianoRoll.displayRange.start"
      />
    </template>
    <template #midi-keyboard>
      <midi-keyboard-container />
    </template>
    <template #note-display>
      <note-display
        :pianoRoll="pianoRoll"
      />
    </template>
    <template #automation-display>
      <automation-display
        :clips="pianoRoll.clips"
        :totalTicks="pianoRoll.totalTicks"
        :startTime="pianoRoll.displayRange.start"
      />
    </template>
  </piano-roll-layout>
</template>

<script>
import PianoRollLayout from './PianoRollLayout';
import NoteDisplay from './NoteDisplay';
import MidiKeyboardContainer from './MidiKeyboardContainer';
import PianoRollRuler from './PianoRollRuler';
import AutomationDisplay from './AutomationDisplay';
import Vue from 'vue';
import { getPianoRollData } from '../../interactors/PianoRoll';

export default Vue.extend({
  components: {
    PianoRollLayout,
    MidiKeyboardContainer,
    NoteDisplay,
    PianoRollRuler,
    AutomationDisplay
  },
  computed: {
    pianoRoll () {
      return getPianoRollData();
    }
  }
});

</script>

<style scoped>

</style>
