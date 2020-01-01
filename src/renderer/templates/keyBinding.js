// @flow
import {
  deleteNotes,
  noteShiftDown,
  noteShiftLeft,
  noteShiftRight,
  noteShiftUp,
  selectAllNotes
} from '../interactors/Note';
import { windowSwitchEventHub } from '../modules';
import { ALTERNATE, SPLIT } from '../../constants/layout';
import { deselectNotes as deselectNotesFn } from '../usecases/pianoRoll';
import { getZoomManager } from '../utils/view/pianoRoll/ZoomManager';

const zoomManager = getZoomManager();

const ALL = 'ALL';
const PIANO_ROLL = 'PIANO_ROLL';
// const ARRANGEMENT = 'ARRANGEMENT';

export const ApplicationMenuKeyBindings = {
  SaveProject: 'cmd+s',
  NewProject: 'cmd+n',
  Quit: 'cmd+q',
  ExportMidi: 'cmd+shift+e'
};

export const keyBindingTemplate = {
  deselectNotes: {
    scope: PIANO_ROLL,
    keys: 'esc',
    keyHandler: () => deselectNotesFn()
  },
  selectAllNotes: {
    scope: PIANO_ROLL,
    keys: 'cmd+a',
    keyHandler: () => selectAllNotes()
  },
  horizontalZoomIn: {
    scope: PIANO_ROLL,
    keys: 'h',
    keyHandler: () => zoomManager.horizontalZoomIn()
  },
  horizontalZoomOut: {
    scope: PIANO_ROLL,
    keys: 'g',
    keyHandler: () => zoomManager.horizontalZoomOut()
  },
  verticalZoomIn: {
    scope: PIANO_ROLL,
    keys: 'shift+h',
    keyHandler: () => zoomManager.verticalZoomIn()
  },
  verticalZoomOut: {
    scope: PIANO_ROLL,
    keys: 'shift+g',
    keyHandler: () => zoomManager.verticalZoomOut()
  },
  noteShiftLeft: {
    scope: PIANO_ROLL,
    keys: 'left',
    keyHandler: () => noteShiftLeft(240)
  },
  noteShiftRight: {
    scope: PIANO_ROLL,
    keys: 'right',
    keyHandler: () => noteShiftRight(240)
  },
  noteShiftUp: {
    scope: PIANO_ROLL,
    keys: 'up',
    keyHandler: () => noteShiftUp(1)
  },
  noteShiftDown: {
    scope: PIANO_ROLL,
    keys: 'down',
    keyHandler: () => noteShiftDown(1)
  },
  deleteNotes: {
    scope: PIANO_ROLL,
    keys: 'clear,backspace,del,delete',
    keyHandler: () => deleteNotes()
  },
  switchWindow: {
    scope: ALL,
    keys: 'tab',
    keyHandler: () => windowSwitchEventHub.emit(null, { layout: ALTERNATE })
  },
  splitWindow: {
    scope: ALL,
    keys: 'cmd+d',
    keyHandler: () => windowSwitchEventHub.emit(null, { layout: SPLIT })
  }
};
