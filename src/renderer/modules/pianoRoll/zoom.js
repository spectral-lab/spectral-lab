import hotkeys from 'hotkeys-js';

export const manageZoom = view => {
  hotkeys('h', () => horizontalZoomIn(view));
  hotkeys('g', () => horizontalZoomOut(view));
  hotkeys('shift+h', () => vericalZoomIn(view));
  hotkeys('shift+g', () => verticalZoomOut(view));
};
const horizontalZoomIn = (view) => {
  const enlargedElts = [
    view.querySelector('#note-container'),
    view.querySelector('#ruler-container'),
    view.querySelector('#automation-container')
  ];
  enlargedElts.forEach(elt => {
    elt.style.width = `${elt.offsetWidth * 1.3}px`;
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
const vericalZoomIn = (view) => {
  const enlargedElts = [
    view.querySelector('#note-container'),
    view.querySelector('#key-container')
  ];
  enlargedElts.forEach(elt => {
    elt.style.height = `${elt.offsetHeight * 1.3}px`;
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
