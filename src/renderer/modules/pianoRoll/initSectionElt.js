import { initDivElement } from './utils';
import { AUTOMATION_LANE, MIDI_KEYBOARD, NOTE_DISPLAY, RULER } from './constants/section-types';

const initSectionElt = (sectionType) => {
  switch (sectionType) {
    case NOTE_DISPLAY: return initNoteDisplay();
    case MIDI_KEYBOARD: return initMidiKeyboard();
    case AUTOMATION_LANE: return initAutomationLane();
    case RULER: return initRuler();
    default: return initDivElement(sectionType);
  }
};

const initNoteDisplay = () => {
  const noteDisplay = initDivElement(NOTE_DISPLAY);
  noteDisplay.classList.add('scrollbar-hidden');
  const container = initDivElement('note-container');
  const noteLayer = initDivElement('note-layer');
  const gridLayer = initDivElement('grid-layer', 'note-bg-grid');
  container.appendChild(noteLayer);
  container.appendChild(gridLayer);
  noteDisplay.appendChild(container);
  return noteDisplay;
};

const initMidiKeyboard = () => {
  const midiKeyboard = initDivElement(MIDI_KEYBOARD);
  midiKeyboard.classList.add('scrollbar-hidden');
  midiKeyboard.appendChild(initDivElement('key-container'));
  return midiKeyboard;
};

const initAutomationLane = () => {
  const automationLane = initDivElement(AUTOMATION_LANE);
  // automationLane.classList.add('scrollbar-hidden');
  const container = initDivElement('automation-container');
  const automationLayer = initDivElement('automation-layer');
  const gridLayer = initDivElement('grid-layer', 'note-bg-grid');
  container.appendChild(automationLayer);
  container.appendChild(gridLayer);
  automationLane.appendChild(container);
  return automationLane;
};

const initRuler = () => {
  const elt = initDivElement(RULER);
  elt.classList.add('scrollbar-hidden');
  elt.appendChild(initDivElement('ruler-container'));
  return elt;
};

export default initSectionElt;
