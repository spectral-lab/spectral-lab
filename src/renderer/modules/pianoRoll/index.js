import { initDivElement, makeDraggable, syncHorizontalScroll, syncVerticalScroll } from './utils';
import * as sectionTypes from './constants/section-types';
import { camelCase } from 'change-case';
import initSection from './initSection';

/**
 * @param {object} [options]
 * @returns {{view: HTMLDivElement, addNote: function}}
 */
const pianoRoll = (options) => {
  const defaults = {};
  const defaultedOptions = Object.assign({}, defaults, options);
  const sectionElts = Object.values(sectionTypes).reduce((elts, type) => {
    elts[camelCase(type)] = initSection(type);
    return elts;
  }, {});
  const view = initDivElement('view');
  makeDraggable(sectionElts.border, view);
  syncHorizontalScroll(sectionElts.noteDisplay, sectionElts.automationLane);
  syncHorizontalScroll(sectionElts.noteDisplay, sectionElts.ruler);
  syncVerticalScroll(sectionElts.noteDisplay, sectionElts.midiKeyboard);
  Object.values(sectionElts).forEach(elt => view.appendChild(elt));
  const addNote = note => {
    const noteOn = initDivElement('note-on');
    sectionElts.noteDisplay.getElementsByClassName('note-container')[0].appendChild(noteOn);
  };
  return {
    view,
    addNote
  };
};

export default pianoRoll;
