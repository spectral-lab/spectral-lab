<template>
  <div class="app-layout">
    <div class="title-bar-container">
      <title-bar />
    </div>
    <div
      ref="appMainContent"
      class="app-main-content"
    >
      <elastic-div-stack
        :border-width="24"
        :upper-content-height="arrangementZoneHeight"
        @change-height="arrangementZoneHeight = $event.upperContentHeight"
      >
        <template #upper>
          <div
            ref="arrangementZoneContainer"
            :style="{
              borderColor: arrangementZoneBorderColor
            }"
            @click="selectArrangementZone"
            class="arrangement-zone-container"
          >
            <arrangement-zone />
          </div>
        </template>
        <template #lower>
          <div
            :style="{
              borderColor: pianoRollZoneBorderColor
            }"
            @click="selectPianoRollZone"
            class="piano-roll-zone-container"
          >
            <piano-roll-zone />
          </div>
        </template>
      </elastic-div-stack>
    </div>
    <div class="transport-container">
      <transport />
    </div>
  </div>
</template>

<script>
import Transport from './Transport';
import PianoRollZone from '../piano-roll-zone/PianoRollZone';
import ArrangementZone from '../arrangement-zone/ArrangementZone';
import ElasticDivStack from './ElasticDivStack';
import TitleBar from './TitleBar';
import { titleBarHeight, transportHeight, borderHeight } from '../../../constants/layout';
import hotkeys from 'hotkeys-js';
import { SPLIT_WINDOW, SWITCH_WINDOW } from '../../../constants/key-bindings';
import { App } from '../../store/models';
import { ARRANGEMENT, PIANO_ROLL } from '../../../constants/model-types';
import Vue from 'vue';

export default Vue.extend({
  components: {
    PianoRollZone,
    Transport,
    ArrangementZone,
    TitleBar,
    ElasticDivStack
  },
  data () {
    return {
      arrangementZoneHeight: 0,
      windowHeight: 800,
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
        case ARRANGEMENT: return 'grey';
        case PIANO_ROLL: return 'transparent';
        default: return 'transparent';
      }
    },
    pianoRollZoneBorderColor () {
      switch (this.selectedZone) {
        case ARRANGEMENT: return 'transparent';
        case PIANO_ROLL: return 'grey';
        default: return 'transparent';
      }
    }
  },
  mounted () {
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
      this.arrangementZoneHeight = this.appMainContentHeight();
    },
    expandPianoRollZone () {
      this.arrangementZoneHeight = 0;
    },
    splitWindow () {
      this.arrangementZoneHeight = this.appMainContentHeight() * 0.5;
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
    },
    appMainContentHeight () {
      return this.$refs.appMainContent.offsetHeight;
    }
  }
});
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
    z-index: 1000;
    grid-area: 1 / 1 / 2 / 2;
  }
  .app-main-content {
    grid-area: 2 / 1 / 3 / 2;
    box-sizing: border-box;
    overflow: hidden;
  }
  .transport-container {
    grid-area: 3 / 1 / 4 / 2;
    z-index: 10;
  }
  .arrangement-zone-container {
    height: 100%;
    overflow: hidden;
    border: solid 2px;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .piano-roll-zone-container {
    height: 100%;
    overflow: auto;
    border: solid 2px;
    border-radius: 10px;
    box-sizing: border-box;
  }
</style>
