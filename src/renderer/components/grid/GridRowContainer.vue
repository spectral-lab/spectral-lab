<template>
  <div
    ref="gridRowContainer"
    class="grid-row-container"
  >
    <div
      v-for="noteNumber in reversedNoteNumbers"
      :key="noteNumber"
      class="grid-item-wrapper"
    >
      <grid-row
        :note-number="noteNumber"
        :visible-line="visibleLine"
      />
    </div>
  </div>
</template>

<script>
import GridRow from './GridRow';
import elementResizeDetector from 'element-resize-detector';
import { range } from 'lodash';

export default {
  components: {
    GridRow
  },
  data () {
    return {
      height: 0,
      noteNumbers: range(128)
    };
  },
  computed: {
    reversedNoteNumbers () {
      return [...this.noteNumbers].reverse();
    },
    visibleLine () {
      if (this.height > 20e3) return 'CENT';
      if (this.height > 5e3) return 'NOTE';
      if (this.height > 1750) return 'OCTAVE';
      return 'NONE';
    }
  },
  mounted () {
    elementResizeDetector({ strategy: 'scroll' }).listenTo(this.$refs.gridRowContainer, (element) => {
      this.height = element.offsetHeight;
    });
  }
};
</script>

<style scoped>
    .grid-row-container {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        overflow: hidden;
    }
    .grid-item-wrapper {
        z-index: 0;
        width: 100%;
        flex: 1 1;
        min-height: 0;
        overflow: hidden;
    }
</style>
