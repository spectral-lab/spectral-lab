<template>
    <g>
        <piano-roll-transition
                :transition="note.pitchTransition"
                transition-type="PITCH"
                :total-ticks="totalTicks"
                :color="color"
        />
    </g>
</template>

<script>
import { Note } from '../store/models';
import PianoRollTransition from './PianoRollTransition';

export default {
  components: { PianoRollTransition },
  props: {
    note: Note,
    totalTicks: Number
  },
  computed: {
    color () {
      return this.note.parent.color;
    }
  }
};
</script>

<style scoped>
</style>
