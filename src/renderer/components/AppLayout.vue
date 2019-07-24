<template>
  <div class="app-layout">
    <title-bar/>
    <div class="app-main-content"
         ref="appMainContent"
         :style="{ height: `${appMainContentHeight}px` }"
         >
      <div class="arrangement-view-container"
           ref="arrangementViewContainer"
           :style="{ height: `${arrangementViewHeight}px` }">
        <arrangement-view/>
      </div>
      <div ref="border" class="border" :style="{ height: `${borderHeight}px` }"></div>
      <div class="clip-view-container"
           :style="{ height: `${clipViewHeight}px` }">
        <clip-view/>
      </div>
    </div>
    <transport/>
  </div>
</template>

<script>
import Transport from './Transport';
import ClipView from './ClipView';
import ArrangementView from './ArrangementView';
import { clamp, debounce } from 'lodash';
import TitleBar from './TitleBar';
import { initialArrangementViewHeight, titleBarHeight, transportHeight, borderHeight } from '../constants/layout';

export default {
  data () {
    return {
      windowHeight: 800,
      arrangementViewHeight: parseInt(initialArrangementViewHeight, 10),
      titleBarHeight: parseInt(titleBarHeight, 10),
      transportHeight: parseInt(transportHeight, 10),
      borderHeight: parseInt(borderHeight, 10)
    };
  },
  computed: {
    appMainContentHeight () {
      return this.windowHeight - this.titleBarHeight - this.transportHeight;
    },
    clipViewHeight () {
      return this.appMainContentHeight - this.arrangementViewHeight - this.borderHeight - 6;
    }
  },
  created () {
    this.windowHeight = window.innerHeight;
  },
  mounted () {
    window.addEventListener('resize', debounce(() => {
      this.windowHeight = window.innerHeight;
    }, 30));
    this.makeDraggable();
    this.switchToArrangementView();
  },
  methods: {
    switchToArrangementView () {
      this.arrangementViewHeight = this.appMainContentHeight - this.borderHeight - 6;
    },
    switchToClipView () {
      this.arrangementViewHeight = 0;
    },
    splitHorizontally () {
      this.arrangementViewHeight = (this.appMainContentHeight - this.borderHeight - 6) * 0.5;
    },
    makeDraggable () {
      let dragging = false;
      this.$refs.border.addEventListener('mousedown', () => {
        document.body.style.cursor = 'row-resize';
        dragging = true;
      });
      document.addEventListener('mouseup', () => {
        if (!dragging) return;
        document.body.style.cursor = 'default';
        dragging = false;
      });
      this.$refs.appMainContent.addEventListener('mousemove', (ev) => {
        if (!dragging) return;
        this.arrangementViewHeight = clamp(
          ev.pageY - this.$refs.appMainContent.offsetTop,
          0,
          Math.max(this.$refs.appMainContent.clientHeight, 1)
        );
      });
    }
  },
  components: {
    ClipView,
    Transport,
    ArrangementView,
    TitleBar
  }
};
</script>

<style scoped>
  .app-main-content {
    /*display: flex;*/
    /*height: 95vh;*/
    /*flex-direction: column;*/
    overflow: hidden;
  }
  .arrangement-view-container {
    /*flex: 1 1 auto;*/
    overflow: auto;
  }
  .clip-view-container {
    overflow: auto;
    /*flex: 1 1 auto;*/
  }
  .border {
    cursor: row-resize;
    background: #212121;
    z-index: 100;
  }
</style>

