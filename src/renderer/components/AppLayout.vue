<template>
  <div class="app-layout">
    <div class="title-bar-container">
      <title-bar />
    </div>
    <div
      ref="appMainContent"
      class="app-main-content"
    >
      <elastic-stack
        :border-width="24"
        :upper-content-height="arrangementZoneHeight"
        @change-height="arrangementZoneHeight = $event.upperHeight"
      >
        <template #upper>
          <div
            ref="arrangementZoneContainer"
            class="arrangement-zone-container"
            :style="{
              borderColor: arrangementZoneBorderColor
            }"
            @click="selectArrangementZone"
          >
            <arrangement-zone />
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
            <piano-roll-zone />
          </div>
        </template>
      </elastic-stack>
    </div>
    <div class="transport-container">
      <transport />
    </div>
  </div>
</template>

<script>
import Transport from './Transport';
import PianoRollZone from './PianoRollZone';
import ArrangementZone from './ArrangementZone';
import ElasticStack from './ElasticStack';
import TitleBar from './TitleBar';
import { debounce } from 'lodash';
import { titleBarHeight, transportHeight, borderHeight } from '../constants/layout';
import hotkeys from 'hotkeys-js';
import { SPLIT_WINDOW, SWITCH_WINDOW } from '../constants/key-bindings';
import { App } from '../store/models';
import { ARRANGEMENT, PIANO_ROLL } from '../constants/model-types';
import elementResizeDetector from 'element-resize-detector';

export default {
  components: {
    PianoRollZone,
    Transport,
    ArrangementZone,
    TitleBar,
    ElasticStack
  },
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
        default: return 'transparent';
      }
    },
    pianoRollZoneBorderColor () {
      switch (this.selectedZone) {
        case ARRANGEMENT: return 'transparent';
        case PIANO_ROLL: return 'lightgrey';
        default: return 'transparent';
      }
    }
  },
  mounted () {
    elementResizeDetector({ strategy: 'scroll' }).listenTo(this.$refs.appMainContent, debounce((element) => {
      const proportionOfArrangementZone = this.arrangementZoneHeight / this.appMainContentHeight;
      this.appMainContentHeight = element.offsetHeight;
      this.arrangementZoneHeight = this.appMainContentHeight * proportionOfArrangementZone;
    }, 30));
    this.appMainContentHeight = this.$refs.appMainContent.offsetHeight;
    hotkeys(SWITCH_WINDOW.keys, SWITCH_WINDOW.scope, this.switchWindow);
    hotkeys(SPLIT_WINDOW.keys, SPLIT_WINDOW.scope, this.splitWindow);
    // this.expandArrangementZone();
    // this.selectArrangementZone();
    this.expandPianoRollZone();
    this.selectPianoRollZone();
  },
  methods: {
    switchWindow (ev) {
      ev.preventDefault();
      if (this.selectedZone === ARRANGEMENT) {
        this.expandPianoRollZone();
        this.selectPianoRollZone();
        return;
      }
      this.expandArrangementZone();
      this.selectArrangementZone();
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
      if (this.selectedZone === PIANO_ROLL) return;
      App.update({
        where: this.app.id,
        data: {
          selectedZone: PIANO_ROLL
        }
      });
    },
    selectArrangementZone () {
      if (this.selectedZone === ARRANGEMENT) return;
      App.update({
        where: this.app.id,
        data: {
          selectedZone: ARRANGEMENT
        }
      });
    }
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
