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

export const VIEW = {
  background: 'black',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  gridTemplateRows: stringifyProperty(GRID_TEMPLATE_ROWS)
};
export const AUTOMATION_LANE = {
  gridColumnStart: 2,
  gridColumnEnd: 'end',
  gridRowStart: 4,
  gridRowEnd: 'end',
  background: 'red',
  overflow: 'auto'
};
export const AUTOMATION_LANE_SELECTOR = {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 4,
  gridRowEnd: 'end',
  background: 'purple'
};
export const RULER = {
  overflow: 'auto',
  gridColumnStart: 2,
  gridColumnEnd: 'end',
  gridRowStart: 1,
  gridRowEnd: 2,
  background: 'grey'
};
export const NOTE_DISPLAY = {
  overflow: 'auto',
  gridColumnStart: 2,
  gridColumnEnd: 'end',
  gridRowStart: 2,
  gridRowEnd: 4,
  background: 'pink'
};
export const MIDI_KEYBOARD = {
  overflow: 'auto',
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 2,
  gridRowEnd: 4,
  background: 'yellow',
  scrollbarWidth: '1px'
};

export const BORDER = {
  cursor: 'row-resize',
  zIndex: 10,
  gridColumnStart: 1,
  gridColumnEnd: 'end',
  gridRowStart: 3,
  gridRowEnd: 5
};

export const NOTE_CONTAINER = {
  height: '100%',
  width: '100%',
  borderRadius: '10%',
  background: 'lightgrey',
  position: 'relative'
};

export const NOTE_LAYER = {
  width: '100%',
  height: '100%',
  position: 'absolute'
};

export const GRID_LAYER = {
  width: '100%',
  height: '100%',
  position: 'absolute'
};

export const KEY_CONTAINER = {
  position: 'relative',
  height: '100%',
  width: '100%',
  borderRadius: '10%',
  background: 'lightgrey'
};

export const AUTOMATION_CONTAINER = {
  position: 'relative',
  height: '100%',
  width: '100%',
  borderRadius: '30%',
  background: 'magenta'
};

export const AUTOMATION_LAYER = {
  width: '100%',
  height: '100%',
  position: 'absolute'
};

export const RULER_CONTAINER = {
  position: 'relative',
  height: '100%',
  width: '100%',
  borderRadius: '30%',
  background: 'cyan'
};

export const NOTE_ON = {
  zIndex: 100,
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  background: 'blue'
};
