<template>
  <div
    ref="pianoRollContainer"
    class="piano-roll-container"
  >
    <piano-roll
      :total-bars="totalBars"
      :beats-in-bar="beatsInBar"
      :ticks-per-beat="song.ticksPerBeat"
      :notes="notes"
      :selected-note-ids="selectedNoteIds"
      :editing-note-id="editingNoteId"
      :spectrogram="spectrogram"
      @click="handleClick"
      @dblclick="handleDblClick"
    />
  </div>
</template>

<script>
import PianoRoll from './PianoRoll';
import mockEntities from '../../../test/data/mockEntities';
import { SET_ENTITIES } from '../store/mutation-types';
import { Clip, Song, Note, PianoRoll as PianoRollModel } from '../store/models';
import hotkeys from 'hotkeys-js';
import { DESELECT_NOTES, SELECT_ALL_NOTES } from '../constants/key-bindings';
import { bindKeys, unbindKeys } from '../modules/pianoRoll/utils';

export default {
  components: {
    PianoRoll
  },
  data () {
    return {
      editingNoteId: null
    };
  },
  computed: {
    song () {
      return Song.query().last();
    },
    clip () {
      return Clip.query().where('selected', true).withAllRecursive().last();
    },
    audioBuffer () {
      return this.clip.audioBuffer;
    },
    spectrogram () {
      return this.audioBuffer ? this.audioBuffer.spectrogram : null;
    },
    notes () {
      return this.clip.notes;
    },
    beatsInBar () {
      return this.clip.beatsPerBar[0].val;
    },
    totalBars () {
      return Math.ceil(this.clip.duration / this.song.ticksPerBeat / this.beatsInBar);
    },
    selectedNoteIds () {
      return Note.query().where('selected', true).get().map(note => note.id);
    },
    someNotesAreSelected () {
      return this.selectedNoteIds.length !== 0;
    },
    pianoRollModelInstance () {
      return PianoRollModel.query().first();
    },
    mouseMode () {
      return this.pianoRollModelInstance.mouseMode;
    }
  },
  watch: {
    someNotesAreSelected (someNotesAreSelected) {
      someNotesAreSelected ? bindKeys() : unbindKeys();
    }
  },
  mounted () {
    // this.loadMockNotes();
    hotkeys(DESELECT_NOTES.keys, DESELECT_NOTES.scope, this.clearSelections);
    hotkeys(SELECT_ALL_NOTES.keys, SELECT_ALL_NOTES.scope, (ev) => { ev.preventDefault(); this.selectAll(); });
  },
  methods: {
    loadMockNotes () {
      this.$store.commit(SET_ENTITIES, mockEntities);
    },
    handleClick (ev, { target, id }) {
      if (target === 'NOTE') {
        if (!ev.metaKey && !ev.shiftKey) {
          this.editingNoteId = null;
          Note.update({
            where: note => note.selected && note.id !== id,
            data: {
              selected: false
            }
          });
        }
        this.editingNoteId = null;
        Note.update({
          where: id,
          data: {
            selected: true
          }
        });
      }
    },
    handleDblClick (ev, { target, id }) {
      if (target === 'NOTE') this.editingNoteId = id;
    },
    clearSelections () {
      this.editingNoteId = null;
      Note.update({
        where: note => note.selected,
        data: {
          selected: false
        }
      });
    },
    selectAll () {
      Note.update({
        where: _ => true,
        data: { selected: true }
      });
    }
  }
};
</script>

<style scoped>
.piano-roll-container{
    height: 60vh;
}
</style>
