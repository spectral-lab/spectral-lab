import hotkeys from 'hotkeys-js';
import { debounce } from 'lodash';

export const manageZoom = wrapperElement => {
  hotkeys('h', () => horizontalZoomIn(wrapperElement));
  hotkeys('g', () => horizontalZoomOut(wrapperElement));
  hotkeys('shift+h', () => verticalZoomIn(wrapperElement));
  hotkeys('shift+g', () => verticalZoomOut(wrapperElement));
  listenResize(wrapperElement);
};

const listenResize = (wrapperElement) => {
  window.addEventListener('resize', debounce(() => handleResize(wrapperElement), 120));
};

const handleResize = (wrapperElement) => {
  const noteDisplay = wrapperElement.querySelector('.note-display');
  const container = wrapperElement.querySelector('.note-container');
  const [minWidth, minHeight] = [noteDisplay.offsetWidth, noteDisplay.offsetHeight];
  if (container.offsetWidth < minWidth) resetHorizontalZoom(wrapperElement);
  if (container.offsetHeight < minHeight) resetVerticalZoom(wrapperElement);
};

const resetHorizontalZoom = (wrapperElement) => {
  const resetElts = [
    wrapperElement.querySelector('.note-container'),
    wrapperElement.querySelector('.ruler-container'),
    wrapperElement.querySelector('.automation-container')
  ];
  resetElts.forEach(elt => {
    elt.style.width = `100%`;
  });
};

const resetVerticalZoom = (wrapperElement) => {
  const resetElts = [
    wrapperElement.querySelector('.note-container'),
    wrapperElement.querySelector('.key-container')
  ];
  resetElts.forEach(elt => {
    elt.style.height = `100%`;
  });
};

const horizontalZoomIn = (wrapperElement) => {
  const minWidth = wrapperElement.querySelector('.note-display').offsetWidth;
  const enlargedElts = [
    wrapperElement.querySelector('.note-container'),
    wrapperElement.querySelector('.ruler-container'),
    wrapperElement.querySelector('.automation-container')
  ];
  enlargedElts.forEach(elt => {
    elt.style.width = `${Math.max(elt.offsetWidth * 1.4, minWidth)}px`;
  });
};
const horizontalZoomOut = (wrapperElement) => {
  const minWidth = wrapperElement.querySelector('.note-display').offsetWidth;
  const reducedElts = [
    wrapperElement.querySelector('.note-container'),
    wrapperElement.querySelector('.ruler-container'),
    wrapperElement.querySelector('.automation-container')
  ];
  reducedElts.forEach(elt => {
    elt.style.width = `${Math.max(elt.offsetWidth / 1.4, minWidth)}px`;
  });
};
const verticalZoomIn = (wrapperElement) => {
  const minHeight = wrapperElement.querySelector('.note-display').offsetHeight;
  const enlargedElts = [
    wrapperElement.querySelector('.note-container'),
    wrapperElement.querySelector('.key-container')
  ];
  enlargedElts.forEach(elt => {
    elt.style.height = `${Math.max(elt.offsetHeight * 1.4, minHeight)}px`;
  });
};
const verticalZoomOut = (wrapperElement) => {
  const minHeight = wrapperElement.querySelector('.note-display').offsetHeight;
  const reducedElts = [
    wrapperElement.querySelector('.note-container'),
    wrapperElement.querySelector('.key-container')
  ];
  reducedElts.forEach(elt => {
    elt.style.height = `${Math.max(elt.offsetHeight / 1.4, minHeight)}px`;
  });
};
