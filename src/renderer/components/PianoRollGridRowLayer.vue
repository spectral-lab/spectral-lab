<template>
    <div ref="gridRowLayer" class="grid-row-layer">
        <div v-for="noteNumber in reversedNoteNumbers" class="grid-item-wrapper">
            <piano-roll-grid-row-item
                    :noteNumber="noteNumber"
                    :visible-line="visibleLine"
            />
        </div>
    </div>
</template>

<script>
import pianoRollGridRowItem from './PianoRollGridRowItem';
import elementResizeDetector from 'element-resize-detector';
import { range } from 'lodash';

export default {
  data () {
    return {
      height: 0,
      noteNumbers: range(128)
    };
  },
  computed: {
    reversedNoteNumbers () {
      return this.noteNumbers.reverse();
    },
    visibleLine () {
      if (this.height > 25e3) return 'CENT';
      if (this.height > 5e3) return 'NOTE';
      if (this.height > 1750) return 'OCTAVE';
      return 'NONE';
    }
  },
  mounted () {
    const detector = elementResizeDetector({ strategy: 'scroll' });
    detector.listenTo(this.$refs.gridRowLayer, (element) => {
      this.height = element.offsetHeight;
    });
  },
  components: {
    pianoRollGridRowItem
  }
};
</script>

<style scoped>
    .grid-row-layer {
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
