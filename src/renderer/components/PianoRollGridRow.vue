<template>
    <div class="grid-row" :style="{ background: color }"></div>
</template>

<script>
  import * as teoria from 'teoria';

  export default {
    props: {
      noteNumber: Number
    },
    computed: {
      accidental () {
        return teoria.note.fromMIDI(this.noteNumber).accidental();
      },
      color () {
        if (this.accidental === '') return '#5f5f5f';
        return '#3d3d3d';
      }
    }
  };
</script>

<style scoped>
.grid-row {
    z-index: 30;
    border-bottom: solid black 1px;
    flex: 1 1;
    width: 100%;
}
</style>
