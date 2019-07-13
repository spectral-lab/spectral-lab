import * as style from './style';
import { clamp } from 'lodash';
import { paramCase, constantCase } from 'change-case';
const { GRID_TEMPLATE_ROWS, stringifyProperty } = style;

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
/**
 * @param {string} className
 * @param {string} [id]
 * @returns {HTMLDivElement}
 */
export const initDivElement = (className, id) => {
  const elt = document.createElement('div');
  elt.classList.add(paramCase(className));
  elt.id = id || paramCase(className);
  assignStylesTo(elt, style[constantCase(className)]);
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
    const tmpRows = [...GRID_TEMPLATE_ROWS];
    tmpRows.find(row => row.type === 'automation-lane').val = height;
    gridContainer.style.gridTemplateRows = stringifyProperty(tmpRows);
  });
};
