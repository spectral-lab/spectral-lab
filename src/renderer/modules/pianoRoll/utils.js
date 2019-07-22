import * as style from './style';
import { clamp } from 'lodash';
import { paramCase, constantCase } from 'change-case';
import { Note, NoteOn, NoteOff, Modulation } from '../../store/models';
import {
  NOTE_SHIFT_DOWN,
  NOTE_SHIFT_LEFT,
  NOTE_SHIFT_RIGHT,
  NOTE_SHIFT_UP,
  DELETE
} from '../../constants/key-bindings';
import hotkeys from 'hotkeys-js';
const { GRID_TEMPLATE_ROWS, stringifyProperty } = style;

/**
 * @property {HTMLElement} elt
 * @property {object} styles
 * */
export const assignStylesTo = (elt, styles) => {
  if (!styles) {
    console.warn(`Empty Style (id: ${elt.id})`);
    return;
  }
  Object.keys(styles).forEach(property => {
    elt.style[property] = styles[property];
  });
};
/**
 * @param {string} className
 * @param {string} [id]
 * @returns {HTMLDivElement}
 */
export const initDivElement = (className, id) => {
  const elt = document.createElement('div');
  elt.classList.add(paramCase(className));
  if (id) elt.id = id;
  assignStylesTo(elt, style[constantCase(className)]);
  return elt;
};
export const getOffsetTop = element => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
};
/**
 * @param {HTMLElement} borderElt
 * @param {HTMLElement} gridContainer
 */
export const makeDraggable = (borderElt, gridContainer) => {
  let dragging = false;
  borderElt.addEventListener('mousedown', () => {
    document.body.style.cursor = 'row-resize';
    dragging = true;
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    document.body.style.cursor = 'default';
    dragging = false;
  });
  gridContainer.addEventListener('mousemove', (ev) => {
    if (!dragging) return;
    const height = clamp(
      getOffsetTop(gridContainer) + gridContainer.clientHeight - ev.pageY,
      0,
      Math.max(gridContainer.clientHeight - 48, 1)
    );
    const tmpRows = [...GRID_TEMPLATE_ROWS];
    tmpRows.find(row => row.type === 'automation-lane').val = height;
    gridContainer.style.gridTemplateRows = stringifyProperty(tmpRows);
  });
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
};

export const unbindKeys = () => {
  hotkeys.unbind(NOTE_SHIFT_LEFT);
  hotkeys.unbind(NOTE_SHIFT_RIGHT);
  hotkeys.unbind(NOTE_SHIFT_UP);
  hotkeys.unbind(NOTE_SHIFT_DOWN);
  hotkeys.unbind(DELETE);
};
