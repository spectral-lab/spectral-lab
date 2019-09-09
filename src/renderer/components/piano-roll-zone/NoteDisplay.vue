<template>
  <div
    ref="note-display"
    class="note-display"
  >
    <note-display-grid
      :beatsPerBar="pianoRoll.beatsPerBar"
      :totalBars="pianoRoll.totalBars"
      :opacity="pianoRoll.gridOpacity"
      :opacityWillChange="pianoRoll.opacityWillChange"
    />
    <piano-roll-spectrogram
      :spectrograms="pianoRoll.spectrograms"
      :opacity="pianoRoll.spectrogramOpacity"
      :opacityWillChange="pianoRoll.opacityWillChange"
      :totalTicks="pianoRoll.totalTicks"
    />
    <drawing-area
      :total-ticks="pianoRoll.totalTicks"
      :mouse-mode="pianoRoll.mouseMode"
      :editing-clip-id="pianoRoll.clips[0].id"
    >
      <note-display-note-item-container
        :notes="pianoRoll.notes"
        :totalTicks="pianoRoll.totalTicks"
      />
    </drawing-area>
  </div>
</template>

<script>
import NoteDisplayGrid from './NoteDisplayGrid';
import NoteDisplayNoteItemContainer from './NoteDisplayNoteItemContainer';
import PianoRollSpectrogram from './PianoRollSpectrogram';
import DrawingArea from './DrawingArea';
import Vue from 'vue';

export default Vue.extend({
  components: {
    NoteDisplayGrid,
    NoteDisplayNoteItemContainer,
    PianoRollSpectrogram,
    DrawingArea
  },
  props: {
    pianoRoll: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style scoped>
  .note-display {
    height: 100%;
    width: 100%;
    position: relative;
    background: rgb(20,20,20);
  }
</style>
