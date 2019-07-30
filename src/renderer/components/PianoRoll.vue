<template>
  <div
    ref="pianoRoll"
    class="piano-roll"
  >
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
    <div class="note-display-section">
      <note-display />
    </div>
    <div class="midi-keyboard-section">
      <midi-keyboard-container />
    </div>
    <div
      ref="border"
      class="border"
    />
    <!--    <div-->
    <!--      ref="automationLaneSelector"-->
    <!--      class="automation-lane-selector"-->
    <!--    />-->
    <!--    <div-->
    <!--      ref="automationLaneContent"-->
    <!--      class="automation-lane-content scrollbar-hidden"-->
    <!--    >-->
    <!--      <div-->
    <!--        ref="automationContainer"-->
    <!--        class="automation-container"-->
    <!--      >-->
    <!--        <piano-roll-grid-column-layer-->
    <!--          :total-bars="totalBars"-->
    <!--          :beats-per-bar="beatsInBar"-->
    <!--        />-->
    <!--        <div-->
    <!--          ref="automationLayer"-->
    <!--          class="automation-layer"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { composeAddNote, manageDragAndScrollAndZoom } from '../modules/pianoRoll';
// import PianoRollGridColumnLayer from './PianoRollGridColumnLayer';
// import PianoRollMidiKeyboard from './MidiKeyboard';
import NoteDisplay from './NoteDisplay';
import MidiKeyboardContainer from './MidiKeyboardContainer';

export default {
  components: {
    NoteDisplay,
    // PianoRollGridColumnLayer,
    // PianoRollMidiKeyboard,
    MidiKeyboardContainer
  },
  computed: {
    sections () {
      return {
        ruler: this.$refs.ruler,
        noteDisplay: this.$refs.noteDisplay,
        midiKeyboard: this.$refs.midiKeyboard,
        border: this.$refs.border,
        automationLaneSelector: this.$refs.automationLaneSelector,
        automationLaneContent: this.$refs.automationLaneContent
      };
    }
  },
  mounted () {
    // manageDragAndScrollAndZoom(this.$refs.pianoRoll, this.sections);
    this.addNote = composeAddNote(this.$refs.noteLayer);
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
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 40px 1fr 4px 4px 120px;
    animation: fadein 1s;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.midi-keyboard-section {
  overflow: auto;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 4;
}

.note-display-section {
  overflow: auto;
  grid-column-start: 2;
  grid-column-end: end;
  grid-row-start: 2;
  grid-row-end: 4;
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
