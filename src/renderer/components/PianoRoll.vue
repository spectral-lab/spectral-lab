<template>
    <div ref="wrapper" class="wrapper">
        <div ref="ruler" class="ruler scrollbar-hidden">
            <div ref="rulerContainer" class="ruler-container"></div>
        </div>
        <div ref="noteDisplay" class="note-display scrollbar-hidden">
            <div ref="noteContainer" class="note-container">
                <div ref="noteGridLayer" class="grid-layer">
                    <piano-roll-grid-row-layer/>
                    <piano-roll-grid-column-layer :total-beats="totalBeats" :total-bars="totalBars"/>
                </div>
                <div ref="noteLayer" class="note-layer"></div>
            </div>
        </div>
        <div ref="midiKeyboard" class="midi-keyboard scrollbar-hidden">
            <div ref="keyContainer" class="key-container">
                <piano-roll-midi-keyboard/>
            </div>
        </div>
        <div ref="border" class="border"></div>
        <div ref="automationLaneSelector" class="automation-lane-selector"></div>
        <div ref="automationLaneContent" class="automation-lane-content scrollbar-hidden">
            <div ref="automationContainer" class="automation-container">
                <piano-roll-grid-column-layer :total-beats="totalBeats" :total-bars="totalBars"/>
                <div ref="automationLayer" class="automation-layer"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { composeAddNote, manageDragAndScrollAndZoom } from '../modules/pianoRoll';
import PianoRollGridRowLayer from './PianoRollGridRowLayer';
import PianoRollGridColumnLayer from './PianoRollGridColumnLayer';
import PianoRollMidiKeyboard from './PianoRollMidiKeyboard';

export default {
  props: {
    totalBeats: Number,
    totalBars: Number
  },
  mounted () {
    manageDragAndScrollAndZoom(this.$refs.wrapper, this.sections);
    this.addNote = composeAddNote(this.$refs.noteLayer);
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
  components: {
    PianoRollGridRowLayer,
    PianoRollGridColumnLayer,
    PianoRollMidiKeyboard
  }
};
</script>

<style scoped>
.wrapper {
    background: rgb(33,33,33);
    height: 100%;
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 40px 1fr 4px 4px 120px;
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
    background: grey;
}
.note-display {
    overflow: auto;
    grid-column-start: 2;
    grid-column-end: end;
    grid-row-start: 2;
    grid-row-end: 4;
}
.midi-keyboard {
    overflow: auto;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 4;
}

.border {
    cursor: row-resize;
    z-index: 100;
    grid-column-start: 1;
    grid-column-end: end;
    grid-row-start: 3;
    grid-row-end: 5;
}

.note-container {
    height: 200%;
    width: 100%;
    position: relative;
}

.note-layer {
    width: 100%;
    height: 100%;
    position: absolute;
}

.grid-layer {
    width: 100%;
    height: 100%;
    position: absolute;
}

.key-container {
    position: relative;
    height: 200%;
    width: 100%;
}

.automation-container {
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 30%;
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
    border-radius: 30%;
    background: cyan;
}

.scrollbar-hidden::-webkit-scrollbar  {
    display:none;
    width:0px;
    background-color:transparent;
}
</style>
