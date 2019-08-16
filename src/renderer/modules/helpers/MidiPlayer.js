// @flow
import OutputManager from '../outputManager';// eslint-disable-next-line no-unused-vars
import { NoteAction } from '../../../types';
import { NOTE_ON, MODULATION, NOTE_OFF, CLIP } from '../../../constants/model-types';
// eslint-disable-next-line no-unused-vars
import { Clip } from '../../store/models';
// eslint-disable-next-line no-unused-vars

export class MidiPlayer extends OutputManager {
  play (item: any) {
    switch (item.type) {
      case CLIP: return this.playClip(item);
    }
  }

  testTone () {
    const noteOnMessage = [0x91, 69, 0x7f];
    const noteOffMessage = [0x81, 69, 0x40];
    this._send(noteOnMessage);
    this._send(noteOffMessage, 480);
  }

  playClip (clip: Clip): void {
    const noteActions: NoteAction = clip.sortedNoteActions;
    const noteControl = {};
    noteActions.forEach(noteAction => {
      const noteOffsetTime = noteAction.parent.offsetTime;
      if (noteAction.type === NOTE_ON) {
        noteControl[noteAction.noteId] = this.noteOn(noteAction, noteOffsetTime);
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
}

export class offlineMidiRenderer extends MidiPlayer {
  render (item: any) {
    this.play(item);
  }
}
