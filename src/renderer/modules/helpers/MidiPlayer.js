// @flow
import { IOutputManager } from '../outputManager';// eslint-disable-next-line no-unused-vars
import type { NoteAction } from '../../../types';
import { NOTE_ON, MODULATION, NOTE_OFF, CLIP, NOTE } from '../../../constants/model-types';
// eslint-disable-next-line no-unused-vars
import { Clip, Note } from '../../store/models';
// eslint-disable-next-line no-unused-vars

export class MidiPlayer {
  outputManager: IOutputManager;

  constructor (outputManager: IOutputManager) {
    this.outputManager = outputManager;
  }

  play (item: Clip | Note) {
    switch (item.type) {
      case CLIP: return this.playClip(item);
      case NOTE: return this.playNote(item);
    }
  }

  testTone () {
    const noteOnMessage = [0x91, 69, 0x7f];
    const noteOffMessage = [0x81, 69, 0x40];
    this.outputManager.send(noteOnMessage);
    this.outputManager.send(noteOffMessage, 480);
  }

  playClip (clip: Clip): void {
    const noteActions = clip.sortedNoteActions;
    const noteControl = {};
    noteActions.forEach(noteAction => {
      const noteOffsetTime = noteAction.parent.offsetTime;
      if (noteAction.type === NOTE_ON) {
        noteControl[noteAction.noteId] = this.outputManager.noteOn(noteAction, noteOffsetTime);
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
  }

  playNote (note: Note): void {
    console.log('Playing note');
  }
}

export class offlineMidiRenderer extends MidiPlayer {
  render (item: any) {
    this.play(item);
  }
}
