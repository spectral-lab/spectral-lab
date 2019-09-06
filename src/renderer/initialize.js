// @flow
import store from './store';
import hotkeys from 'hotkeys-js';
import {
  DELETE_NOTES,
  NOTE_SHIFT,
  SAVE_PROJECT,
  SELECT_ALL_NOTES,
  SPLIT_WINDOW,
  SWITCH_WINDOW
} from '../constants/key-bindings';
import mockEntities from '../../test/data/json/mockEntities';
import { SET_ENTITIES } from './store/mutation-types';
import {
  deleteNotes,
  noteShiftDown,
  noteShiftLeft,
  noteShiftRight,
  noteShiftUp,
  selectAllNotes
} from './interactors/Note';
import { saveProject } from './usecases/project';
import { ipcRenderer } from 'electron';
import { CREATE, DIALOG } from '../constants/event-types';
import { dialogEventHub, windowSwitchEventHub } from './modules';
import { ALTERNATE, SPLIT, ARRANGEMENT } from '../constants/layout';
import { TRACK } from '../constants/model-types';
import { createTrack } from './interactors/Track';

// =====================================================================================================================

export const initialize = () => {
  bindKeys();
  listenIpc();
  if (process.env.NODE_ENV === 'development') loadMockEntities();
  windowSwitchEventHub.emit(null, { layout: ARRANGEMENT });
};

export default initialize;

// =====================================================================================================================

const bindKeys = () => {
  hotkeys(SAVE_PROJECT.keys, SAVE_PROJECT.scope, saveProject);
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
};

const loadMockEntities = () => {
  store.commit(SET_ENTITIES, mockEntities);
};

const listenIpc = () => {
  ipcRenderer.on(DIALOG, (...args) => {
    dialogEventHub.emit(...args);
  });
  ipcRenderer.on(CREATE, (_ev, { type }) => {
    if (type === TRACK) createTrack();
  });
};
