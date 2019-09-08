// @flow
import { Note, NoteOff, Modulation } from '../store/models';
import { PEN } from '../../constants/mouse-modes';
import uid from 'uid';
import { posXToTick, posYToPitch } from '../utils/view/pianoRoll/utils';
import { pitchToNoteNumberAndPitchBend } from '../utils/helpers';
import Vue from 'vue';
import { getPianoRollData } from '../interactors/PianoRoll';

/**
 * for `NoteDisplayNoteItemContainer` component
 */
export const drawHandler = Vue.extend({
  props: {
    totalTicks: {
      type: Number,
      default: 7680
    }
  },
  data () {
    return {
      drawingNote: null
    };
  },
  computed: {
    pianoRoll () {
      return getPianoRollData();
    },
    drawing () {
      return Boolean(this.drawingNote);
    },
    /**
     * should be overrided by parent
     */
    noteContainer (): null | HTMLElement {
      return null;
    }
  },
  methods: {
    handleMouseDown (ev) {
      console.log('mousedown', ev.target);
      if (!this.noteContainer) return;
      if (this.pianoRoll.mouseMode !== PEN) return;
      const offsetTime = posXToTick(ev.offsetX / this.noteContainer.offsetWidth, this.totalTicks);
      const { noteNumber, pitchBend } = pitchToNoteNumberAndPitchBend(
        posYToPitch(ev.offsetY / this.noteContainer.offsetHeight)
      );
      this.drawingNote = {
        id: uid(),
        offsetTime,
        noteNumber
      };
      Note.insert({
        data: {
          id: this.drawingNote.id,
          clipId: this.pianoRoll.clips[0].id,
          offsetTime,
          noteNumber,
          noteOn: {
            id: uid(),
            pitchBend
          }
        }
      });
    },
    handleMouseMove (ev) {
      if (!this.drawing) return;
      if (!this.noteContainer) return;
      const offsetTime = posXToTick(ev.offsetX / this.noteContainer.offsetWidth, this.totalTicks);
      const pitch = posYToPitch(ev.offsetY / this.noteContainer.offsetHeight);
      Modulation.insert({
        data: {
          id: uid(),
          noteId: this.drawingNote.id,
          offsetTime: offsetTime - this.drawingNote.offsetTime,
          pitchBend: pitch - this.drawingNote.noteNumber
        }
      });
    },
    handleMouseUp (ev) {
      if (!this.drawing) return;
      if (!this.noteContainer) return;
      const offsetTime = posXToTick(ev.offsetX / this.noteContainer.offsetWidth, this.totalTicks);
      const pitch = posYToPitch(ev.offsetY / this.noteContainer.offsetHeight);
      NoteOff.insert({
        data: {
          id: uid(),
          noteId: this.drawingNote.id,
          offsetTime: offsetTime - this.drawingNote.offsetTime,
          pitchBend: pitch - this.drawingNote.noteNumber
        }
      });
      this.drawingNote = null;
    }
  }
});
