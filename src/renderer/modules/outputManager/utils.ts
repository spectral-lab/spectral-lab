import { NoteAction } from '../../typedef';
import { NOTE_ON, MODULATION, NOTE_OFF } from '../../constants/model-types';
import { Clip } from '../../store/models';
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
