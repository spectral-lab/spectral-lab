<template>
    <div class="transition-wrapper">
        <piano-roll-transition
                :transition="note.pitchTransition"
                transition-type="PITCH"
                :total-ticks="totalTicks"
                :color="color"
        />
    </div>
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
    .transition-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
