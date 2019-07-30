import { PIANO_ROLL } from './model-types';
const ALL = 'all';

export const SAVE_PROJECT = {
  scope: ALL,
  keys: 'cmd+s'
};
export const DESELECT_NOTES = {
  scope: PIANO_ROLL,
  keys: 'esc'
};
export const SELECT_ALL_NOTES = {
  scope: PIANO_ROLL,
  keys: 'cmd+a'
};
export const ZOOM = {
  horizontalZoomIn: {
    scope: PIANO_ROLL,
    keys: 'h'
  },
  horizontalZoomOut: {
    scope: PIANO_ROLL,
    keys: 'g'
  },
  verticalZoomIn: {
    scope: PIANO_ROLL,
    keys: 'shift+h'
  },
  verticalZoomOut: {
    scope: PIANO_ROLL,
    keys: 'shift+g'
  }
};
export const NOTE_SHIFT = {
  left: {
    scope: PIANO_ROLL,
    keys: 'left'
  },
  right: {
    scope: PIANO_ROLL,
    keys: 'right'
  },
  up: {
    scope: PIANO_ROLL,
    keys: 'up'
  },
  down: {
    scope: PIANO_ROLL,
    keys: 'down'
  }
};
export const DELETE_NOTES = {
  scope: PIANO_ROLL,
  keys: 'clear,backspace,del,delete'
};
export const SWITCH_WINDOW = {
  scope: ALL,
  keys: 'tab'
};
export const SPLIT_WINDOW = {
  scope: ALL,
  keys: 'cmd+d'
};
