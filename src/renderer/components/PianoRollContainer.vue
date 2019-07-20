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
                @click-note="handleClickNote"
                @dblclick-note="handleDblClickNote"
        />
    </div>
</template>

<script>
import PianoRoll from './PianoRoll';
import mockEntities from '../../../test/data/mockEntities';
import { SET_ENTITIES } from '../store/mutation-types';
import { Clip, Song, Note, NoteOn, NoteOff, Modulation } from '../store/models';
import hotkeys from 'hotkeys-js';
import {
  ESCAPE,
  NOTE_SHIFT_DOWN,
  NOTE_SHIFT_LEFT,
  NOTE_SHIFT_RIGHT,
  NOTE_SHIFT_UP,
  DELETE,
  SELECT_ALL
} from '../constants/key-bindings';

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
    hasNoteSelected () {
      return this.selectedNoteIds.length !== 0;
    }
  },
  watch: {
    hasNoteSelected (hasNoteSelected) {
      if (hasNoteSelected) {
        hotkeys(NOTE_SHIFT_LEFT, (ev) => {
          ev.preventDefault();
          Note.query().where('selected', true).get().forEach(note => {
            Note.update({
              where: note.id,
              data: {
                offsetTime: note.offsetTime - 100
              }
            });
          });
        });
        hotkeys(NOTE_SHIFT_RIGHT, (ev) => {
          ev.preventDefault();
          Note.query().where('selected', true).get().forEach(note => {
            Note.update({
              where: note.id,
              data: {
                offsetTime: note.offsetTime + 100
              }
            });
          });
        });
        hotkeys(NOTE_SHIFT_UP, (ev) => {
          ev.preventDefault();
          Note.query().where('selected', true).get().forEach(note => {
            Note.update({
              where: note.id,
              data: {
                noteNumber: note.noteNumber + 1
              }
            });
          });
        });
        hotkeys(NOTE_SHIFT_DOWN, (ev) => {
          ev.preventDefault();
          Note.query().where('selected', true).get().forEach(note => {
            Note.update({
              where: note.id,
              data: {
                noteNumber: note.noteNumber - 1
              }
            });
          });
        });
        hotkeys(DELETE, (ev) => {
          ev.preventDefault();
          Note.query().where('selected', true).withAll().get().forEach(note => {
            const { noteOn, noteOff, modulations, id } = note;
            Note.delete(id);
            NoteOn.delete(noteOn.id);
            NoteOff.delete(noteOff.id);
            modulations.forEach(mod => Modulation.delete(mod.id));
          });
        });
      }
      if (!hasNoteSelected) {
        hotkeys.unbind(NOTE_SHIFT_LEFT);
        hotkeys.unbind(NOTE_SHIFT_RIGHT);
        hotkeys.unbind(NOTE_SHIFT_UP);
        hotkeys.unbind(NOTE_SHIFT_DOWN);
        hotkeys.unbind(DELETE);
      }
    }
  },
  methods: {
    loadMockNotes () {
      this.$store.commit(SET_ENTITIES, mockEntities);
    },
    handleClickNote (ev, id) {
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
    },
    handleDblClickNote (_, id) {
      this.editingNoteId = id;
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
    // this.loadMockNotes();
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

