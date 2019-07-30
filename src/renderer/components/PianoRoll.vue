<template>
  <div
    ref="pianoRoll"
    class="piano-roll"
  >
    <elastic-div-stack
      :border-width="24"
      :upper-content-height="upperContentHeight"
      @change-height="upperContentHeight = $event.upperContentHeight"
    >
      <template #upper>
        <div class="upper-content">
          <!--    <div-->
          <!--      ref="ruler"-->
          <!--      class="ruler scrollbar-hidden"-->
          <!--    >-->
          <!--      <div-->
          <!--        ref="rulerContainer"-->
          <!--        class="ruler-container"-->
          <!--      >-->
          <!--        <piano-roll-grid-column-layer-->
          <!--          :total-bars="totalBars"-->
          <!--          :beats-per-bar="beatsInBar"-->
          <!--          :show-number="true"-->
          <!--        />-->
          <!--      </div>-->
          <!--    </div>-->
          <div
            ref="noteDisplayViewport"
            class="note-display-viewport"
          >
            <div
              ref="noteDisplayContent"
              class="note-display-content"
            >
              <note-display />
            </div>
          </div>
          <div
            ref="midiKeyboardViewport"
            class="midi-keyboard-viewport"
          >
            <div
              ref="midiKeyboardContent"
              class="midi-keyboard-content"
            >
              <midi-keyboard-container />
            </div>
          </div>
        </div>
      </template>
      <template #lower>
        <!--        <div class="lower-content">-->
        <!--          <div-->
        <!--            ref="automationLaneSelector"-->
        <!--            class="automation-lane-selector"-->
        <!--          />-->
        <!--          <div-->
        <!--            ref="automationLaneContent"-->
        <!--            class="automation-lane-content scrollbar-hidden"-->
        <!--          >-->
        <!--            <div-->
        <!--              ref="automationContainer"-->
        <!--              class="automation-container"-->
        <!--            >-->
        <!--              <piano-roll-grid-column-layer-->
        <!--                :total-bars="totalBars"-->
        <!--                :beats-per-bar="beatsInBar"-->
        <!--              />-->
        <!--              <div-->
        <!--                ref="automationLayer"-->
        <!--                class="automation-layer"-->
        <!--              />-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </template>
    </elastic-div-stack>
  </div>
</template>

<script>
import NoteDisplay from './NoteDisplay';
import MidiKeyboardContainer from './MidiKeyboardContainer';
import ElasticDivStack from './ElasticDivStack';
import ZoomManager from '../modules/pianoRoll/ZoomManager';
import { syncScroll } from '../modules/pianoRoll/scroll';

export default {
  components: {
    NoteDisplay,
    MidiKeyboardContainer,
    ElasticDivStack
  },
  data () {
    return {
      upperContentHeight: 500
    };
  },
  mounted () {
    const zoomManager = new ZoomManager({
      resizeBasis: this.$refs.noteDisplayViewport,
      horizontalZoomTargets: [this.$refs.noteDisplayContent],
      verticalZoomTargets: [this.$refs.noteDisplayContent, this.$refs.midiKeyboardContent]
    });
    syncScroll({
      verticalScrollTargets: [this.$refs.noteDisplayViewport, this.$refs.midiKeyboardViewport],
      horizontalScrollTargets: []
    });
  },
  methods: {
    handleClickNote (ev, id) {
      this.$emit('click', ev, { target: 'NOTE', id });
    },
    handleDblClickNote (ev, id) {
      this.$emit('dblclick', ev, { target: 'NOTE', id });
    }
  }
};
</script>

<style scoped>
.piano-roll {
    background: rgb(33,33,33);
    height: 60vh;
    animation: fadein 1s;
}

.upper-content {
  height: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 40px 1fr;
}

.lower-content {
  height: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.midi-keyboard-viewport {
  overflow: auto;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: end;
}

.note-display-viewport {
  overflow: auto;
  grid-column-start: 2;
  grid-column-end: end;
  grid-row-start: 2;
  grid-row-end: end;
}

.note-display-content {
  width: 100%;
  height: 200%;
}

.midi-keyboard-content {
  width: 100%;
  height: 200%;
}

.automation-lane-content {
    grid-column-start: 2;
    grid-column-end: end;
    grid-row-start: 4;
    grid-row-end: end;
    background: rgb(50,50,50);
    overflow: auto;
    border-top: solid 2px rgb(100, 112, 114);
}
.automation-lane-selector {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: end;
    background: rgb(55, 55, 55);
}
.ruler {
    overflow: auto;
    grid-column-start: 2;
    grid-column-end: end;
    grid-row-start: 1;
    grid-row-end: 2;
    background: rgb(100, 112, 114);
}
.border {
    cursor: row-resize;
    z-index: 100;
    grid-column-start: 1;
    grid-column-end: end;
    grid-row-start: 3;
    grid-row-end: 5;
}

.automation-container {
    position: relative;
    height: 100%;
    width: 100%;
}

.automation-layer {
    width: 100%;
    height: 100%;
    position: absolute;
}

.ruler-container {
    position: relative;
    height: 100%;
    width: 100%;
}

.scrollbar-hidden::-webkit-scrollbar  {
    display:none;
    width:0px;
    background-color:transparent;
}
</style>
