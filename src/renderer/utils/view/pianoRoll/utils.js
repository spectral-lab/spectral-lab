/**
 * @param {HTMLElement} element
 * @returns {number}
 */
export const getOffsetTopFromRoot = element => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
};
/**
 * @param {number} pitch noteNumber + pitchBend
 * @returns {number} from 0 to 1
 */
export const pitchToPosY = pitch => 1 - pitch / 128;
/**
 * @param {number} y from 0 to 1
 * @returns {number} from 0 to 127
 */
export const posYToPitch = y => (1 - y) * 128;
/**
 * @param {number} tick
 * @param {number} totalTicks in the clip
 * @returns {number} from 0 to 1
 */
export const tickToPosX = (tick, totalTicks) => tick / totalTicks;
/**
 * @param {number} x from 0 to 1
 * @param {number} totalTicks in the clip
 * @returns {number}
 */
export const posXToTick = (x, totalTicks) => x * totalTicks;
/**
 * @param {HTMLElement} elt
 * @returns {x: number, y: number} position in container normalized into a number between 0 to 1.
 */
export const getNormalizedPos = elt => ({
  x: elt.offsetLeft / elt.offsetParent.offsetWidth,
  y: elt.offsetTop / elt.offsetParent.offsetHeight
});
