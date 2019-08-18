// eslint-disable-next-line no-unused-vars
import { NoteAction } from '../../../types';
import { NOTE_ON, MODULATION, NOTE_OFF } from '../../../constants/model-types';
// eslint-disable-next-line no-unused-vars
import { Clip } from '../../store/models';
// eslint-disable-next-line no-unused-vars
import OutputManager from '.';

export const processClip = (clip: Clip, outputManager: OutputManager): void => {
  const noteActions: NoteAction = clip.sortedNoteActions;
  const noteControl = {};
  noteActions.forEach(noteAction => {
    const noteOffsetTime = noteAction.parent.offsetTime;
    if (noteAction.type === NOTE_ON) {
      noteControl[noteAction.noteId] = outputManager.noteOn(noteAction, noteOffsetTime);
    }
    if (noteAction.type === MODULATION) {
      const nc = noteControl[noteAction.noteId];
      if (!nc) return;
      nc.modulate(noteAction, noteOffsetTime + noteAction.offsetTime);
    }
    if (noteAction.type === NOTE_OFF) {
      const nc = noteControl[noteAction.noteId];
      if (!nc) return;
      nc.noteOff(noteAction, noteOffsetTime + noteAction.offsetTime);
    }
  });
};
