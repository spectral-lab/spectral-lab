import { initDivElement, makeDraggable, pitchToPosY, tickToPosX } from './utils';
import { manageScroll } from './scroll';
import { manageZoom } from './zoom';

/**
 * @param {Element} wrapperElement
 * @param {object} sections
 */
export const manageDragAndScrollAndZoom = (wrapperElement, sections) => {
  makeDraggable(sections.border, wrapperElement);
  manageScroll(sections);
  manageZoom(wrapperElement);
};

export const composeAddNote = noteLayer => note => {
  const noteOnElt = initDivElement('note-on', `note-on-${note.id}`);
  noteLayer.appendChild(noteOnElt);
  const { time, noteNumber, pitchBend } = note.noteOn;
  const x = tickToPosX(time, 2000);
  const y = pitchToPosY(noteNumber + pitchBend);
  noteOnElt.style.left = `${x * 100}%`;
  noteOnElt.style.top = `${y * 100}%`;
};
