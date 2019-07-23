<template>
  <div>
    <div class="main" ref="main">
      <div class="arrangement-view-container">
        <arrangement-view/>
      </div>
      <div ref="border" class="border"></div>
      <div class="clip-view-container" :style="{ maxHeight: `${clipViewHeight}px` }">
        <clip-view/>
      </div>
    </div>
    <transport/>
  </div>
</template>

<script>
import PianoRollContainer from './PianoRollContainer';
import Transport from './Transport';
import ToolbarContainer from './ToolbarContainer';
import InfoBar from './InfoBar';
import AudioInfoContainer from './AudioInfoContainer';
import FooterToolbar from './FooterToolbar';
import ClipView from './ClipView';
import ArrangementView from './ArrangementView';
import { clamp } from 'lodash';
import { getOffsetTop } from '../modules/pianoRoll/utils';

export default {
  data () {
    return {
      clipViewHeight: 300
    };
  },
  components: {
    ClipView,
    AudioInfoContainer,
    PianoRollContainer,
    ToolbarContainer,
    FooterToolbar,
    InfoBar,
    Transport,
    ArrangementView
  },
  mounted () {
    this.makeDraggable(this.$refs.border, this.$refs.main);
  },
  methods: {
    makeDraggable (borderElt, wrapper) {
      let dragging = false;
      borderElt.addEventListener('mousedown', () => {
        document.body.style.cursor = 'row-resize';
        dragging = true;
      });
      document.addEventListener('mouseup', () => {
        if (!dragging) return;
        document.body.style.cursor = 'default';
        dragging = false;
      });
      wrapper.addEventListener('mousemove', (ev) => {
        if (!dragging) return;
        this.clipViewHeight = clamp(
          getOffsetTop(wrapper) + wrapper.clientHeight - ev.pageY,
          0,
          Math.max(wrapper.clientHeight - 48, 1)
        );
      });
    }
  }
};
</script>

<style scoped>
  .main {
    display: flex;
    height: 95vh;
    flex-direction: column;
  }
  .arrangement-view-container {
    flex: 1 1 auto;
  }
  .clip-view-container {
    /*max-height: 2000px;*/
    overflow: auto;
    flex: 1 1 auto;
  }
  .border {
    cursor: row-resize;
    height: 5px;
    background: black;
    z-index: 100;
  }
</style>

