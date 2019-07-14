<template>
    <div ref="wrapper" class="wrapper">
        <div ref="ruler" class="ruler scrollbar-hidden">
            <div ref="rulerContainer" class="ruler-container"></div>
        </div>
        <div ref="noteDisplay" class="note-display scrollbar-hidden">
            <div ref="noteContainer" class="note-container">
                <div ref="noteGridLayer" class="grid-layer">
                    <div ref="noteGridRowLayer" class="grid-row-layer">
                        <piano-roll-grid-row v-for="noteNumber in reversedNoteNumbers" :noteNumber="noteNumber"/>
                    </div>
                    <div ref="noteGridColumnLayer" class="grid-column-layer">
                        <piano-roll-grid-column v-for="_ in totalBeats"/>
                    </div>
                </div>
                <div ref="noteLayer" class="note-layer"></div>
            </div>
        </div>
        <div ref="midiKeyboard" class="midi-keyboard scrollbar-hidden">
            <div ref="keyContainer" class="key-container"></div>
        </div>
        <div ref="border" class="border"></div>
        <div ref="automationLaneSelector" class="automation-lane-selector"></div>
        <div ref="automationLaneContent" class="automation-lane-content scrollbar-hidden">
            <div ref="automationContainer" class="automation-container">
                <div ref="automationGridLayer" class="grid-column-layer">
                    <piano-roll-grid-column v-for="_ in totalBeats"/>
                </div>
                <div ref="automationLayer" class="automation-layer"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { composeAddNote, manageDragAndScrollAndZoom } from '../modules/pianoRoll';
import { range } from 'lodash';
import PianoRollGridRow from './PianoRollGridRow';
import PianoRollGridColumn from './PianoRollGridColumn';

export default {
  data () {
    return {
      noteNumbers: range(128)
    };
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
    },
    reversedNoteNumbers () {
      return this.noteNumbers.reverse();
    },
    totalBeats () {
      return 32;
    }
  },
  components: {
    PianoRollGridRow,
    PianoRollGridColumn
  }
};
</script>

<style scoped>
.wrapper {
    background: black;
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
    background: red;
    overflow: auto;
}
.automation-lane-selector {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: end;
    background: purple;
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
    background: yellow;
}

.border {
    cursor: row-resize;
    z-index: 10;
    grid-column-start: 1;
    grid-column-end: end;
    grid-row-start: 3;
    grid-row-end: 5;
}

.note-container {
    height: 100%;
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

.grid-row-layer {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
}

.grid-column-layer {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
}

.key-container {
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 10%;
    background: lightgrey;
}

.automation-container {
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 30%;
    background: magenta;
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
