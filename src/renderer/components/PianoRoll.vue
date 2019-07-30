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
          <div
            ref="rulerViewport"
            class="ruler-viewport scrollbar-hidden"
          >
            <div
              ref="rulerContent"
              class="ruler-content"
            >
              <ruler-container />
            </div>
          </div>
          <div
            ref="noteDisplayViewport"
            class="note-display-viewport scrollbar-hidden"
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
            class="midi-keyboard-viewport scrollbar-hidden"
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
        <div class="lower-content">
          <div
            ref="automationSelector"
            class="automation-selector"
          />
          <div
            ref="automationDisplayViewport"
            class="automation-display-viewport scrollbar-hidden"
          >
            <div
              ref="automationDisplayContent"
              class="automation-display-content"
            >
              <automation-display />
            </div>
          </div>
        </div>
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
import RulerContainer from './RulerContainer';
import AutomationDisplay from './AutomationDisplay';

export default {
  components: {
    NoteDisplay,
    MidiKeyboardContainer,
    ElasticDivStack,
    RulerContainer,
    AutomationDisplay
  },
  data () {
    return {
      upperContentHeight: 500
    };
  },
  mounted () {
    this.zoomManager = new ZoomManager({
      resizeBasis: this.$refs.noteDisplayViewport,
      horizontalZoomTargets: [
        this.$refs.noteDisplayContent,
        this.$refs.rulerContent,
        this.$refs.automationDisplayContent
      ],
      verticalZoomTargets: [this.$refs.noteDisplayContent, this.$refs.midiKeyboardContent]
    });
    syncScroll({
      verticalScrollTargets: [this.$refs.noteDisplayViewport, this.$refs.midiKeyboardViewport],
      horizontalScrollTargets: [
        this.$refs.noteDisplayViewport,
        this.$refs.rulerViewport,
        this.$refs.automationDisplayViewport
      ]
    });
  }
};
</script>

<style scoped>
.piano-roll {
    background: rgb(66,66,66);
    height: 60vh;
    animation: fadein 1s;
}

.upper-content {
  height: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 40px 1fr;
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

.midi-keyboard-content {
  width: 100%;
  height: 200%;
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

.ruler-viewport {
  overflow: auto;
  grid-column-start: 2;
  grid-column-end: end;
  grid-row-start: 1;
  grid-row-end: 2;
}

.ruler-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.lower-content {
  height: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr;
}

.automation-selector {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: end;
  background: rgb(55, 55, 55);
}

.automation-display-viewport {
    grid-column-start: 2;
    grid-column-end: end;
    grid-row-start: 1;
    grid-row-end: end;
    background: rgb(50,50,50);
    overflow: auto;
    border-top: solid 2px rgb(100, 112, 114);
}

.automation-display-content {
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
