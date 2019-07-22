<template>
    <div ref="pianoRollContainer" class="piano-roll-container">
        <piano-roll
                ref="pianoRoll"
                :total-bars="totalBars"
                :beats-in-bar="song.beatsInBar"
                :ticks-per-beat="song.ticksPerBeat"
                :notes="notes"
                :selectedNoteIds="selectedNoteIds"
                :editingNoteId="editingNoteId"
                @click="handleClick"
                @dblclick="handleDblClick"
        />
    </div>
</template>

<script>
import PianoRoll from './PianoRoll';
import mockEntities from '../../../test/data/mockEntities';
import { SET_ENTITIES } from '../store/mutation-types';
import { Clip, Song, Note } from '../store/models';
import hotkeys from 'hotkeys-js';
import { ESCAPE, SELECT_ALL } from '../constants/key-bindings';
import { bindKeys, unbindKeys } from '../modules/pianoRoll/utils';

export default {
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
    notes () {
      return this.clip.notes;
    },
    totalBars () {
      return Math.ceil(this.clip.duration / this.song.ticksPerBeat / this.song.beatsInBar);
    },
    selectedNoteIds () {
      return Note.query().where('selected', true).get().map(note => note.id);
    },
    noteIsSelected () {
      return this.selectedNoteIds.length !== 0;
    }
  },
  watch: {
    noteIsSelected (noteIsSelected) {
      noteIsSelected ? bindKeys() : unbindKeys();
    }
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
  },
  mounted () {
    this.loadMockNotes();
    hotkeys(ESCAPE, this.clearSelections);
    hotkeys(SELECT_ALL, (ev) => { ev.preventDefault(); this.selectAll(); });
  },
  components: {
    PianoRoll
  }
};
</script>

<style scoped>
.piano-roll-container{
    height: 60vh;
}
</style>

