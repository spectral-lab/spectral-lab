export const GRID_TEMPLATE_ROWS = [
  {
    type: 'ruler',
    val: 40,
    unit: 'px'
  },
  {
    type: 'key-and-note-display',
    val: 1,
    unit: 'fr'
  },
  {
    type: 'border-upper-half',
    val: 4,
    unit: 'px'
  },
  {
    type: 'border-lower-half',
    val: 4,
    unit: 'px'
  },
  {
    type: 'automation-lane',
    val: 120,
    unit: 'px'
  }
];

/**
 * @param {Array.<{val: number, unit: string}>} array
 * @returns {string}
 */
export const stringifyProperty = array => array.map(item => item.val + item.unit).join(' ');

export const NOTE_ON = {
  zIndex: 100,
  position: 'absolute',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  background: 'blue'
};
