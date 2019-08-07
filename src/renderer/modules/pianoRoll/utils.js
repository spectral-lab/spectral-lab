import { Note, NoteOn, NoteOff, Modulation } from '../../store/models';
import {
  NOTE_SHIFT,
  DELETE_NOTES
} from '../../../constants/key-bindings';
import hotkeys from 'hotkeys-js';

/**
 * @param {HTMLElement} element
 * @returns {number}
 */
export const getOffsetTopFromRoot = element => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
};
/**
 * @param {number} pitch noteNumber + pitchBend
 * @returns {number} from 0 to 1
 */
export const pitchToPosY = pitch => 1 - pitch / 128;
/**
 * @param {number} y from 0 to 1
 * @returns {number} from 0 to 127
 */
export const posYToPitch = y => (1 - y) * 128;
/**
 * @param {number} tick
 * @param {number} totalTicks in the clip
 * @returns {number} from 0 to 1
 */
export const tickToPosX = (tick, totalTicks) => tick / totalTicks;
/**
 * @param {number} x from 0 to 1
 * @param {number} totalTicks in the clip
 * @returns {number}
 */
export const posXToTick = (x, totalTicks) => x * totalTicks;
/**
 * @param {HTMLElement} elt
 * @returns {x: number, y: number} position in container normalized into a number between 0 to 1.
 */
export const getNormalizedPos = elt => ({
  x: elt.offsetLeft / elt.offsetParent.offsetWidth,
  y: elt.offsetTop / elt.offsetParent.offsetHeight
});

export const bindKeys = () => {
  hotkeys(NOTE_SHIFT.left.keys, NOTE_SHIFT.left.scope, (ev) => {
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
  hotkeys(NOTE_SHIFT.right.keys, NOTE_SHIFT.right.scope, (ev) => {
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
  hotkeys(NOTE_SHIFT.up.keys, NOTE_SHIFT.up.scope, (ev) => {
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
  hotkeys(NOTE_SHIFT.down.keys, NOTE_SHIFT.down.scope, (ev) => {
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
  hotkeys(DELETE_NOTES.keys, DELETE_NOTES.scope, (ev) => {
    ev.preventDefault();
    Note.query().where('selected', true).withAll().get().forEach(note => {
      const { noteOn, noteOff, modulations, id } = note;
      Note.delete(id);
      NoteOn.delete(noteOn.id);
      NoteOff.delete(noteOff.id);
      modulations.forEach(mod => Modulation.delete(mod.id));
    });
  });
};

export const unbindKeys = () => {
  hotkeys.unbind(NOTE_SHIFT.left.keys);
  hotkeys.unbind(NOTE_SHIFT.right.keys);
  hotkeys.unbind(NOTE_SHIFT.up.keys);
  hotkeys.unbind(NOTE_SHIFT.down.keys);
  hotkeys.unbind(DELETE_NOTES.keys);
};
