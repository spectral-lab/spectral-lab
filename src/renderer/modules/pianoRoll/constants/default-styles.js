export const GRID_TEMPLATE_ROWS = [
  {
    type: 'ruler',
    height: 40,
    unit: 'px'
  },
  {
    type: 'key-and-note-display',
    height: 1,
    unit: 'fr'
  },
  {
    type: 'border-upper-half',
    height: 4,
    unit: 'px'
  },
  {
    type: 'border-lower-half',
    height: 4,
    unit: 'px'
  },
  {
    type: 'automation-lane',
    height: 120,
    unit: 'px'
  }
];

export const VIEW = {
  background: 'black',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  gridTemplateRows: GRID_TEMPLATE_ROWS.map(row => row.height + row.unit).join(' ')
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
  gridColumnStart: 1,
  gridColumnEnd: 'end',
  gridRowStart: 3,
  gridRowEnd: 5
};

export const NOTE_CONTAINER = {
  position: 'relative',
  height: '200%',
  width: '200%',
  borderRadius: '10%',
  background: 'lightgrey'
};

export const KEY_CONTAINER = {
  position: 'relative',
  height: '200%',
  width: '100%',
  borderRadius: '10%',
  background: 'lightgrey'
};

export const AUTOMATION_CONTAINER = {
  position: 'relative',
  height: '100%',
  width: '200%',
  borderRadius: '30%',
  background: 'magenta'
};

export const RULER_CONTAINER = {
  position: 'relative',
  height: '100%',
  width: '200%',
  borderRadius: '30%',
  background: 'cyan'
};

export const NOTE_ON = {
  position: 'absolute',
  top: '10%',
  left: '20%',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  background: 'blue'
};
