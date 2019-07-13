import { initDivElement, makeDraggable } from './utils';
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
  const addNote = note => {
    const noteOn = initDivElement('note-on', `note-on-${note.id}`);
    sectionElts.noteDisplay.querySelector('#note-layer').appendChild(noteOn);
  };
  return {
    view,
    addNote
  };
};

const manageDragAndScrollAndZoom = (view, sectionElts) => {
  makeDraggable(sectionElts.border, view);
  manageScroll(sectionElts);
  manageZoom(view);
};

export default pianoRoll;
