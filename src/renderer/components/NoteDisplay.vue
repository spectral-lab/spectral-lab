<template>
  <div
    class="note-display"
  >
    <note-display-grid-container />
    <spectrogram-container />
    <note-display-note-container />
  </div>
</template>

<script>
import NoteDisplayGridContainer from './NoteDisplayGridContainer';
import NoteDisplayNoteContainer from './NoteDisplayNoteContainer';
import SpectrogramContainer from './SpectrogramContainer';

export default {
  components: {
    NoteDisplayGridContainer,
    NoteDisplayNoteContainer,
    SpectrogramContainer
  }
};
</script>

<style scoped>
  .note-display {
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>
