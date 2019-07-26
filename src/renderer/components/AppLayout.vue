<template>
  <div class="app-layout">
    <title-bar/>
    <div class="app-main-content"
         ref="appMainContent"
         :style="{ height: `${appMainContentHeight}px` }"
         >
      <div class="arrangement-zone-container"
           ref="arrangementZoneContainer"
           :style="{
            height: `${arrangementZoneHeight}px`,
            borderColor: arrangementZoneBorderColor
           }"
           @click="selectArrangementZone"
      >
        <arrangement-zone/>
      </div>
      <div ref="border" class="border" :style="{ height: `${borderHeight}px` }"></div>
      <div class="piano-roll-zone-container"
           :style="{
            height: `${pianoRollZoneHeight}px`,
            borderColor: pianoRollZoneBorderColor
            }"
           @click="selectPianoRollZone"
      >
        <piano-roll-zone/>
        </div>
    </div>
    <transport/>
  </div>
</template>

<script>
import Transport from './Transport';
import PianoRollZone from './PianoRollZone';
import ArrangementZone from './ArrangementZone';
import { clamp, debounce } from 'lodash';
import TitleBar from './TitleBar';
import { titleBarHeight, transportHeight, borderHeight } from '../constants/layout';
import hotkeys from 'hotkeys-js';
import { SPLIT_WINDOW, SWITCH_WINDOW } from '../constants/key-bindings';

const ZONE = {
  ARRANGEMENT: 'ARRANGEMENT',
  PIANO_ROLL: 'PIANO_ROLL'
};
const { ARRANGEMENT, PIANO_ROLL } = ZONE;

export default {
  data () {
    return {
      arrangementZoneHeight: 500,
      selectedZone: ARRANGEMENT,
      windowHeight: 800,
      titleBarHeight: parseInt(titleBarHeight, 10),
      transportHeight: parseInt(transportHeight, 10),
      borderHeight: parseInt(borderHeight, 10)
    };
  },
  computed: {
    appMainContentHeight () {
      return this.windowHeight - this.titleBarHeight - this.transportHeight;
    },
    pianoRollZoneHeight () {
      return this.appMainContentHeight - this.arrangementZoneHeight - this.borderHeight - 12;
    },
    maxArrangementZoneHeight () {
      return this.appMainContentHeight - this.borderHeight - 12;
    },
    arrangementZoneBorderColor () {
      switch (this.selectedZone) {
        case ARRANGEMENT: return 'lightgrey';
        case PIANO_ROLL: return 'transparent';
      }
    },
    pianoRollZoneBorderColor () {
      switch (this.selectedZone) {
        case ARRANGEMENT: return 'transparent';
        case PIANO_ROLL: return 'lightgrey';
      }
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
    hotkeys(SWITCH_WINDOW, this.switchWindow);
    hotkeys(SPLIT_WINDOW, this.splitWindow);
    this.expandPianoRollZone();
    this.selectPianoRollZone();
  },
  methods: {
    switchWindow () {
      if (this.selectedZone === ARRANGEMENT) {
        this.expandPianoRollZone();
        this.selectPianoRollZone();
        return;
      }
      this.expandArrangementZone();
      this.selectArrangementZone();
    },
    expandArrangementZone () {
      this.arrangementZoneHeight = this.maxArrangementZoneHeight;
    },
    expandPianoRollZone () {
      this.arrangementZoneHeight = 0;
    },
    splitWindow () {
      this.arrangementZoneHeight = this.maxArrangementZoneHeight * 0.5;
    },
    selectPianoRollZone () {
      this.selectedZone = PIANO_ROLL;
    },
    selectArrangementZone () {
      this.selectedZone = ARRANGEMENT;
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
        this.arrangementZoneHeight = clamp(
          ev.pageY - this.$refs.appMainContent.offsetTop,
          0,
          Math.max(this.$refs.appMainContent.clientHeight, 1)
        );
      });
    }
  },
  components: {
    PianoRollZone,
    Transport,
    ArrangementZone,
    TitleBar
  }
};
</script>

<style scoped>
  .app-main-content {
    overflow: hidden;
  }
  .arrangement-zone-container {
    overflow: auto;
    border: solid 3px;
    border-radius: 10px;
  }
  .piano-roll-zone-container {
    overflow: auto;
    border: solid 3px;
    border-radius: 10px;
  }
  .border {
    cursor: row-resize;
    background: transparent;
    z-index: 100;
  }
</style>

