<template>
    <div ref="wrapper" class="wrapper">
        <div ref="ruler" class="ruler scrollbar-hidden">
            <div ref="rulerContainer" class="ruler-container">
                <piano-roll-grid-column-layer :total-beats="totalBeats" :total-bars="totalBars" :show-number="true"/>
            </div>
        </div>
        <div ref="noteDisplay" class="note-display scrollbar-hidden">
            <div ref="noteContainer" class="note-container">
                <div ref="noteGridLayer" class="grid-layer" :style="{ opacity: gridOpacity }">
                    <piano-roll-grid-row-layer/>
                    <piano-roll-grid-column-layer :total-beats="totalBeats" :total-bars="totalBars"/>
                </div>
                <div ref="spectrogramLayer"
                     :style="{
                         width: `${spectrogramDuration / totalTicks * 100}%`,
                         opacity: spectrogramOpacity
                     }"
                     class="spectrogram-layer"
                >
                    <canvas ref="spectrogram" class="spectrogram" width="1920" height="1080"></canvas>
                </div>
                <div ref="noteLayer" class="note-layer">
                    <svg width="100%" height="100%">
                        <piano-roll-note
                                v-for="note in notes"
                                :key="note.id"
                                :note="note"
                                :total-ticks="totalTicks"
                                :selected-note-ids="selectedNoteIds"
                                :editing-note-id="editingNoteId"
                                @click="handleClickNote"
                                @dblclick="handleDblClickNote"
                        />
                    </svg>
                </div>
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
import PianoRollNote from './PianoRollNote';
import renderSpectrogram from '../modules/render/renderSpectrogram';

export default {
  props: {
    notes: Array,
    totalBars: Number,
    beatsInBar: Number,
    ticksPerBeat: Number,
    selectedNoteIds: Array,
    editingNoteId: String,
    spectrogram: Object,
    gridOpacity: Number,
    spectrogramOpacity: Number
  },
  watch: {
    spectrogram: {
      handler (spectrogram) {
        renderSpectrogram(spectrogram, this.$refs.spectrogram);
      },
      deep: true
    }
  },
  computed: {
    totalBeats () {
      return this.totalBars * this.beatsInBar;
    },
    totalTicks () {
      return this.totalBars * this.beatsInBar * this.ticksPerBeat;
    },
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
    spectrogramDuration () {
      if (!this.spectrogram) return 0;
      return this.spectrogram.times[this.spectrogram.times.length - 1];
    }
  },
  mounted () {
    manageDragAndScrollAndZoom(this.$refs.wrapper, this.sections);
    this.addNote = composeAddNote(this.$refs.noteLayer);
  },
  methods: {
    handleClickNote (ev, id) {
      this.$emit('click', ev, { target: 'NOTE', id });
    },
    handleDblClickNote (ev, id) {
      this.$emit('dblclick', ev, { target: 'NOTE', id });
    }
  },
  components: {
    PianoRollGridRowLayer,
    PianoRollGridColumnLayer,
    PianoRollMidiKeyboard,
    PianoRollNote
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
    animation: fadein 1s;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
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

.spectrogram-layer {
    width: 100%;
    height: 100%;
    position: absolute;
}

.grid-layer {
    width: 100%;
    height: 100%;
    position: absolute;
}

.spectrogram {
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
