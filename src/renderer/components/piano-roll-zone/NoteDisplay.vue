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
    <note-display-note-item-container
      :notes="pianoRoll.notes"
      :totalTicks="pianoRoll.totalTicks"
    />
  </div>
</template>

<script>
import NoteDisplayGrid from './NoteDisplayGrid';
import NoteDisplayNoteItemContainer from './NoteDisplayNoteItemContainer';
import PianoRollSpectrogram from './PianoRollSpectrogram';
import Vue from 'vue';

export default Vue.extend({
  components: {
    NoteDisplayGrid,
    NoteDisplayNoteItemContainer,
    PianoRollSpectrogram
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
