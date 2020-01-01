// @flow
import { Note } from '../../models';
import type { NoteNumber } from '../../../types';

type pitchPoint = {
  offsetTime: number;
  pitch: NoteNumber;
  id: string;
  type: string;
}

export const pitchTransition = (note: Note): pitchPoint[] => {
  const pitchBendMods = note.modulations.filter(mod => mod.pitchBend !== null);
  const noteActions = [{ offsetTime: 0, ...note.noteOn }, ...pitchBendMods, note.noteOff && note.noteOff].filter(v => v);
  return noteActions.map(noteAction => ({
    offsetTime: note.offsetTime + noteAction.offsetTime,
    pitch: note.noteNumber + noteAction.pitchBend,
    id: noteAction.id,
    type: noteAction.type
  }));
};
