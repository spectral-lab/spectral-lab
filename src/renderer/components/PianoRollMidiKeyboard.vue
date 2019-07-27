<template>
  <div
    ref="svgWrapper"
    class="svg-wrapper"
  />
</template>

<script>
import { range } from 'lodash';
import { drawMidiKeyboard } from '../modules/pianoRoll/midiKeyboard';

export default {
  data () {
    return {
      noteNumbers: range(128)
    };
  },
  computed: {
    reversedNoteNumbers () {
      return [...this.noteNumbers].reverse();
    }
  },
  mounted () {
    drawMidiKeyboard(this.$refs.svgWrapper);
  }
};
</script>

<style scoped>
    .svg-wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    svg{
        height: 100%;
    }
</style>
