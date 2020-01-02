// @flow
import {
  deleteNotes,
  noteShiftDown,
  noteShiftLeft,
  noteShiftRight,
  noteShiftUp,
  selectAllNotes
} from '../interactors/Note';
import { windowSwitchEventHub } from '../modules/container';
import { ALTERNATE, SPLIT } from '../../constants/layout';
import { deselectNotes } from '../usecases/pianoRoll';
import { getZoomManager } from '../utils/view/pianoRoll/ZoomManager';
import { PIANO_ROLL } from '../../constants/model-types';
import { RendererHotKeys } from '../../constants/key-bindings';

const ALL = 'ALL';

export const keyBindingTemplate = {
  deselectNotes: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.DeselectNotes,
    keyHandler: () => deselectNotes()
  },
  selectAllNotes: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.SelectAllNotes,
    keyHandler: () => selectAllNotes()
  },
  horizontalZoomIn: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.HorizontalZoomIn,
    keyHandler: () => getZoomManager().horizontalZoomIn()
  },
  horizontalZoomOut: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.HorizontalZoomOut,
    keyHandler: () => getZoomManager().horizontalZoomOut()
  },
  verticalZoomIn: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.VerticalZoomIn,
    keyHandler: () => getZoomManager().verticalZoomIn()
  },
  verticalZoomOut: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.VerticalZoomOut,
    keyHandler: () => getZoomManager().verticalZoomOut()
  },
  noteShiftLeft: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.NoteShiftLeft,
    keyHandler: () => noteShiftLeft(240)
  },
  noteShiftRight: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.NoteShiftRight,
    keyHandler: () => noteShiftRight(240)
  },
  noteShiftUp: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.NoteShiftUp,
    keyHandler: () => noteShiftUp(1)
  },
  noteShiftDown: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.NoteShiftDown,
    keyHandler: () => noteShiftDown(1)
  },
  noteNudgeLeft: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.NoteNudgeLeft,
    keyHandler: () => noteShiftLeft(30)
  },
  noteNudgeRight: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.NoteNudgeRight,
    keyHandler: () => noteShiftRight(30)
  },
  noteNudgeUp: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.NoteNudgeUp,
    keyHandler: () => noteShiftUp(0.1)
  },
  noteNudgeDown: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.NoteNudgeDown,
    keyHandler: () => noteShiftDown(0.1)
  },
  deleteNotes: {
    scope: PIANO_ROLL,
    keys: RendererHotKeys.DeleteNotes,
    keyHandler: () => deleteNotes()
  },
  switchWindow: {
    scope: ALL,
    keys: RendererHotKeys.SwitchWindow,
    keyHandler: () => windowSwitchEventHub.emit(null, { layout: ALTERNATE })
  },
  splitWindow: {
    scope: ALL,
    keys: RendererHotKeys.SplitWindow,
    keyHandler: () => windowSwitchEventHub.emit(null, { layout: SPLIT })
  }
};
