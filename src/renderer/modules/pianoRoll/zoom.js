import hotkeys from 'hotkeys-js';
import { debounce } from 'lodash';

export const manageZoom = view => {
  hotkeys('h', () => horizontalZoomIn(view));
  hotkeys('g', () => horizontalZoomOut(view));
  hotkeys('shift+h', () => verticalZoomIn(view));
  hotkeys('shift+g', () => verticalZoomOut(view));
  listenResize(view);
};

const listenResize = (view) => {
  window.addEventListener('resize', debounce(() => handleResize(view), 120));
};

const handleResize = (view) => {
  const noteDisplay = view.querySelector('#note-display');
  const container = view.querySelector('#note-container');
  const [minWidth, minHeight] = [noteDisplay.offsetWidth, noteDisplay.offsetHeight];
  if (container.offsetWidth < minWidth) resetHorizontalZoom(view);
  if (container.offsetHeight < minHeight) resetVerticalZoom(view);
};

const resetHorizontalZoom = (view) => {
  const resetElts = [
    view.querySelector('#note-container'),
    view.querySelector('#ruler-container'),
    view.querySelector('#automation-container')
  ];
  resetElts.forEach(elt => {
    elt.style.width = `100%`;
  });
};

const resetVerticalZoom = (view) => {
  const resetElts = [
    view.querySelector('#note-container'),
    view.querySelector('#key-container')
  ];
  resetElts.forEach(elt => {
    elt.style.height = `100%`;
  });
};

const horizontalZoomIn = (view) => {
  const minWidth = view.querySelector('#note-display').offsetWidth;
  const enlargedElts = [
    view.querySelector('#note-container'),
    view.querySelector('#ruler-container'),
    view.querySelector('#automation-container')
  ];
  enlargedElts.forEach(elt => {
    elt.style.width = `${Math.max(elt.offsetWidth * 1.3, minWidth)}px`;
  });
};
const horizontalZoomOut = (view) => {
  const minWidth = view.querySelector('#note-display').offsetWidth;
  const reducedElts = [
    view.querySelector('#note-container'),
    view.querySelector('#ruler-container'),
    view.querySelector('#automation-container')
  ];
  reducedElts.forEach(elt => {
    elt.style.width = `${Math.max(elt.offsetWidth / 1.3, minWidth)}px`;
  });
};
const verticalZoomIn = (view) => {
  const minHeight = view.querySelector('#note-display').offsetHeight;
  const enlargedElts = [
    view.querySelector('#note-container'),
    view.querySelector('#key-container')
  ];
  enlargedElts.forEach(elt => {
    elt.style.height = `${Math.max(elt.offsetHeight * 1.3, minHeight)}px`;
  });
};
const verticalZoomOut = (view) => {
  const minHeight = view.querySelector('#note-display').offsetHeight;
  const reducedElts = [
    view.querySelector('#note-container'),
    view.querySelector('#key-container')
  ];
  reducedElts.forEach(elt => {
    elt.style.height = `${Math.max(elt.offsetHeight / 1.3, minHeight)}px`;
  });
};
