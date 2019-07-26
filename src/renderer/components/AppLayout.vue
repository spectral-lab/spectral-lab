<template>
  <div class="app-layout">
    <div class="title-bar-container">
      <title-bar/>
    </div>
    <div class="app-main-content"
         ref="appMainContent"
         >
      <elastic-stack
        :borderWidth="24"
        :upper-content-height="arrangementZoneHeight"
        @change-height="arrangementZoneHeight = $event"
      >
        <template #upper>
          <div
            class="arrangement-zone-container"
            ref="arrangementZoneContainer"
            :style="{
              borderColor: arrangementZoneBorderColor
            }"
            @click="selectArrangementZone"
          >
            <arrangement-zone/>
          </div>
        </template>
        <template #lower>
          <div
            class="piano-roll-zone-container"
            :style="{
              borderColor: pianoRollZoneBorderColor
            }"
            @click="selectPianoRollZone"
          >
            <piano-roll-zone/>
          </div>
        </template>
      </elastic-stack>
    </div>
    <div class="transport-container">
      <transport/>
    </div>
  </div>
</template>

<script>
import Transport from './Transport';
import PianoRollZone from './PianoRollZone';
import ArrangementZone from './ArrangementZone';
import ElasticStack from './ElasticStack';
import TitleBar from './TitleBar';
import { clamp } from 'lodash';
import { titleBarHeight, transportHeight, borderHeight } from '../constants/layout';
import hotkeys from 'hotkeys-js';
import { SPLIT_WINDOW, SWITCH_WINDOW } from '../constants/key-bindings';
import { App } from '../store/models';
import { ARRANGEMENT, PIANO_ROLL } from '../constants/zone';
import elementResizeDetector from 'element-resize-detector';

export default {
  data () {
    return {
      arrangementZoneHeight: 0,
      windowHeight: 800,
      appMainContentHeight: 0,
      titleBarHeight: parseInt(titleBarHeight, 10),
      transportHeight: parseInt(transportHeight, 10),
      borderHeight: parseInt(borderHeight, 10)
    };
  },
  computed: {
    app () {
      return App.query().first();
    },
    selectedZone () {
      return this.app.selectedZone;
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
  mounted () {
    elementResizeDetector({ strategy: 'scroll' }).listenTo(this.$refs.appMainContent, (element) => {
      this.appMainContentHeight = element.offsetHeight;
    });
    this.appMainContentHeight = this.$refs.appMainContent.offsetHeight;
    hotkeys(SWITCH_WINDOW, this.switchWindow);
    hotkeys(SPLIT_WINDOW, this.splitWindow);
    this.expandArrangementZone();
    this.selectArrangementZone();
  },
  methods: {
    switchWindow () {
      if (this.selectedZone === ARRANGEMENT) {
        this.selectPianoRollZone();
        this.expandPianoRollZone();
        return;
      }
      this.selectArrangementZone();
      this.expandArrangementZone();
    },
    expandArrangementZone () {
      this.arrangementZoneHeight = this.appMainContentHeight;
    },
    expandPianoRollZone () {
      this.arrangementZoneHeight = 0;
    },
    splitWindow () {
      this.arrangementZoneHeight = this.appMainContentHeight * 0.5;
    },
    selectPianoRollZone () {
      App.update({
        where: this.app.id,
        data: {
          selectedZone: PIANO_ROLL
        }
      });
    },
    selectArrangementZone () {
      App.update({
        where: this.app.id,
        data: {
          selectedZone: ARRANGEMENT
        }
      });
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
    TitleBar,
    ElasticStack
  }
};
</script>

<style scoped>
  .app-layout {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 24px 1fr 30px;
    overflow: hidden;
  }
  .title-bar-container {
    grid-area: 1 / 1 / 2 / 2;
  }
  .app-main-content {
    grid-area: 2 / 1 / 3 / 2;
    box-sizing: border-box;
    overflow: hidden;
  }
  .transport-container {
    grid-area: 3 / 1 / 4 / 2;
  }
  .arrangement-zone-container {
    height: 100%;
    overflow: hidden;
    border: solid 3px;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .piano-roll-zone-container {
    height: 100%;
    overflow: auto;
    border: solid 3px;
    border-radius: 10px;
    box-sizing: border-box;
  }
</style>

