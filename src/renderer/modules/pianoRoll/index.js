import { initDivElement, makeDraggable, pitchToPosY, tickToPosX } from './utils';
import * as sectionTypes from './constants/section-types';
import { camelCase } from 'change-case';
import initSectionElt from './initSectionElt';
import { manageScroll } from './scroll';
import { manageZoom } from './zoom';

/**
 * @param {object} [options]
 * @returns {{view: HTMLDivElement, addNote: function}}
 */
const pianoRoll = (options) => {
  const defaults = {};
  const defaultedOptions = Object.assign({}, defaults, options);
  const sectionElts = Object.values(sectionTypes).reduce((elts, type) => {
    elts[camelCase(type)] = initSectionElt(type);
    return elts;
  }, {});
  const view = initDivElement('view');
  Object.values(sectionElts).forEach(elt => view.appendChild(elt));
  manageDragAndScrollAndZoom(view, sectionElts);
  return {
    view,
    addNote: composeAddNote(sectionElts.noteDisplay.querySelector('#note-layer'))
  };
};

const manageDragAndScrollAndZoom = (view, sectionElts) => {
  makeDraggable(sectionElts.border, view);
  manageScroll(sectionElts, view);
  manageZoom(view);
};

const composeAddNote = noteLayer => note => {
  const noteOnElt = initDivElement('note-on', `note-on-${note.id}`);
  noteLayer.appendChild(noteOnElt);
  const { time, noteNumber, pitchBend } = note.noteOn;
  const x = tickToPosX(time, 2000);
  const y = pitchToPosY(noteNumber + pitchBend);
  noteOnElt.style.left = `${x * 100}%`;
  noteOnElt.style.top = `${y * 100}%`;
};

export default pianoRoll;
