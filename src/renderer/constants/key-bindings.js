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
export const HORIZONTAL_ZOOM_IN = {
  scope: PIANO_ROLL,
  keys: 'h'
};
export const HORIZONTAL_ZOOM_OUT = {
  scope: PIANO_ROLL,
  keys: 'g'
};
export const VERTICAL_ZOOM_IN = {
  scope: PIANO_ROLL,
  keys: 'shift+h'
};
export const VERTICAL_ZOOM_OUT = {
  scope: PIANO_ROLL,
  keys: 'shift+g'
};
export const NOTE_SHIFT_LEFT = {
  scope: PIANO_ROLL,
  keys: 'left'
};
export const NOTE_SHIFT_RIGHT = {
  scope: PIANO_ROLL,
  keys: 'right'
};
export const NOTE_SHIFT_UP = {
  scope: PIANO_ROLL,
  keys: 'up'
};
export const NOTE_SHIFT_DOWN = {
  scope: PIANO_ROLL,
  keys: 'down'
};
export const DELETE_NOTES = {
  scope: PIANO_ROLL,
  keys: 'clear,backspace,del,delete'
};
export const SELECT_ALL_NOTES = {
  scope: PIANO_ROLL,
  keys: 'cmd+a'
};
export const SWITCH_WINDOW = {
  scope: ALL,
  keys: 'tab'
};
export const SPLIT_WINDOW = {
  scope: ALL,
  keys: 'cmd+d'
};
