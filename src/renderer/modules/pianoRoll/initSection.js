import { initDivElement } from './utils';
import { AUTOMATION_LANE, MIDI_KEYBOARD, NOTE_DISPLAY, RULER } from './constants/section-types';

const initSection = (sectionType) => {
  const elt = initDivElement(sectionType);
  switch (sectionType) {
    case NOTE_DISPLAY:
      elt.appendChild(initDivElement('note-container'));
      return elt;
    case MIDI_KEYBOARD:
      elt.appendChild(initDivElement('key-container'));
      return elt;
    case AUTOMATION_LANE:
      elt.appendChild(initDivElement('automation-container'));
      return elt;
    case RULER:
      elt.appendChild(initDivElement('ruler-container'));
      return elt;
    default: return elt;
  }
};

export default initSection;
