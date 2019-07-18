<template>
    <div class="transition-wrapper">
        <piano-roll-transition :transition="note.pitchTransition" type="PITCH" :total-ticks="totalTicks"/>
    </div>
</template>

<script>
import * as teoria from 'teoria';
import { Note } from '../store/models';
import PianoRollTransition from './PianoRollTransition';

export default {
  components: { PianoRollTransition },
  props: {
    note: Note,
    totalTicks: Number
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
