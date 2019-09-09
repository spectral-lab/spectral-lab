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
    <note-display-spectrogram
      :spectrograms="pianoRoll.spectrograms"
      :opacity="pianoRoll.spectrogramOpacity"
      :opacityWillChange="pianoRoll.opacityWillChange"
      :totalTicks="pianoRoll.totalTicks"
    />
    <drawing-area
      :total-ticks="pianoRoll.totalTicks"
      :mouse-mode="pianoRoll.mouseMode"
      :id-of-clip-being-edited="idOfClipBeingEdited"
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
import NoteDisplaySpectrogram from './NoteDisplaySpectrogram';
import DrawingArea from './DrawingArea';
import Vue from 'vue';

export default Vue.extend({
  components: {
    NoteDisplayGrid,
    NoteDisplayNoteItemContainer,
    NoteDisplaySpectrogram,
    DrawingArea
  },
  props: {
    pianoRoll: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    idOfClipBeingEdited () {
      if (this.pianoRoll.clips[0]) return this.pianoRoll.clips[0].id;
      return null;
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
