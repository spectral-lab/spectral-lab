import * as defaultStyles from './constants/default-styles';
import { clamp } from 'lodash';
import { paramCase, constantCase } from 'change-case';
const { GRID_TEMPLATE_ROWS } = defaultStyles;

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
export const initDivElement = (name) => {
  const elt = document.createElement('div');
  elt.classList.add(paramCase(name));
  elt.id = paramCase(name);
  assignStylesTo(elt, defaultStyles[constantCase(name)]);
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
    const templateRows = [...GRID_TEMPLATE_ROWS];
    templateRows.find(row => row.type === 'automation-lane').height = height;
    gridContainer.style.gridTemplateRows = templateRows.map(row => row.height + row.unit).join(' ');
  });
};
/**
 * @param {HTMLElement} a
 * @param {HTMLElement} b
 */
export const syncHorizontalScroll = (a, b) => {
  let prev = 0;
  a.addEventListener('scroll', ({ target }) => {
    if (target.scrollLeft === prev) return;
    b.scrollLeft = target.scrollLeft;
    prev = target.scrollLeft;
  });
  b.addEventListener('scroll', ({ target }) => {
    if (target.scrollLeft === prev) return;
    a.scrollLeft = target.scrollLeft;
    prev = target.scrollLeft;
  });
};

export const syncVerticalScroll = (a, b) => {
  let prev = 0;
  a.addEventListener('scroll', ({ target }) => {
    if (target.scrollTop === prev) return;
    b.scrollTop = target.scrollTop;
    prev = target.scrollTop;
  });
  b.addEventListener('scroll', ({ target }) => {
    if (target.scrollTop === prev) return;
    a.scrollTop = target.scrollTop;
    prev = target.scrollTop;
  });
};
