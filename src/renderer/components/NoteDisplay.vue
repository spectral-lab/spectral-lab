<template>
  <div
    ref="note-display"
    class="note-display"
  >
    <note-display-grid-container />
    <spectrogram-container />
    <note-display-note-item-container />
  </div>
</template>

<script>
import NoteDisplayGridContainer from './NoteDisplayGridContainer';
import NoteDisplayNoteItemContainer from './NoteDisplayNoteItemContainer';
import SpectrogramContainer from './SpectrogramContainer';

export default {
  components: {
    NoteDisplayGridContainer,
    NoteDisplayNoteItemContainer,
    SpectrogramContainer
  }
};
</script>

<style scoped>
  .note-display {
    height: 100%;
    width: 100%;
    position: relative;
    background: rgb(20,20,20);
  }
</style>
