import hotkeys from 'hotkeys-js';
import {
  DELETE_NOTES, DESELECT_NOTES,
  NOTE_SHIFT,
  SELECT_ALL_NOTES, SPLIT_WINDOW,
  SWITCH_WINDOW, ZOOM
} from '../../../constants/key-bindings';
import {
  deleteNotes,
  noteShiftDown,
  noteShiftLeft,
  noteShiftRight,
  noteShiftUp,
  selectAllNotes
} from '../../interactors/Note';
import { windowSwitchEventHub } from '../../modules';
import { ALTERNATE, SPLIT } from '../../../constants/layout';
import { deselectNotes } from '../pianoRoll';
import { getZoomManager } from '../../utils/view/pianoRoll/ZoomManager';

export const bindKeys = () => {
  hotkeys(SELECT_ALL_NOTES.keys, SELECT_ALL_NOTES.scope, (ev) => { ev.preventDefault(); selectAllNotes(); });
  hotkeys(NOTE_SHIFT.left.keys, NOTE_SHIFT.left.scope, (ev) => { ev.preventDefault(); noteShiftLeft(240); });
  hotkeys(NOTE_SHIFT.right.keys, NOTE_SHIFT.right.scope, (ev) => { ev.preventDefault(); noteShiftRight(240); });
  hotkeys(NOTE_SHIFT.up.keys, NOTE_SHIFT.up.scope, (ev) => { ev.preventDefault(); noteShiftUp(1); });
  hotkeys(NOTE_SHIFT.down.keys, NOTE_SHIFT.down.scope, (ev) => { ev.preventDefault(); noteShiftDown(1); });
  hotkeys(DELETE_NOTES.keys, DELETE_NOTES.scope, (ev) => { ev.preventDefault(); deleteNotes(); });
  hotkeys(SWITCH_WINDOW.keys, SWITCH_WINDOW.scope, (ev) => {
    ev.preventDefault();
    windowSwitchEventHub.emit(null, { layout: ALTERNATE });
  });
  hotkeys(SPLIT_WINDOW.keys, SPLIT_WINDOW.scope, (ev) => {
    ev.preventDefault();
    windowSwitchEventHub.emit(null, { layout: SPLIT });
  });
  hotkeys(DESELECT_NOTES.keys, DESELECT_NOTES.scope, deselectNotes);
  const zoomManager = getZoomManager();
  hotkeys(ZOOM.horizontalZoomIn.keys, ZOOM.horizontalZoomIn.scope, () => zoomManager.horizontalZoomIn());
  hotkeys(ZOOM.horizontalZoomOut.keys, ZOOM.horizontalZoomOut.scope, () => zoomManager.horizontalZoomOut());
  hotkeys(ZOOM.verticalZoomIn.keys, ZOOM.verticalZoomIn.scope, () => zoomManager.verticalZoomIn());
  hotkeys(ZOOM.verticalZoomOut.keys, ZOOM.verticalZoomOut.scope, () => zoomManager.verticalZoomOut());
};
