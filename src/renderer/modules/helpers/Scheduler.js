// @flow
import type { IOutputManager } from '../outputManager';
import { Clip, Note } from '../../store/models';
import { MODULATION, NOTE_OFF, NOTE_ON } from '../../../constants/model-types';
import type { MidiMessage, Now } from '../../../types';
import { timeConverter } from './timeUtils';

export interface IScheduler {
  immediate(midiMessage: MidiMessage): void;
  addCue(midiMessage: MidiMessage, tick: number): void;
  playClip(clip: Clip): void;
  playNote(note: Note): void;
}

export class Scheduler implements IScheduler {
  _outputManager: IOutputManager | null;

  _now: Now;

  constructor (outputManager: IOutputManager | null = null, now: Now) {
    this._outputManager = outputManager;
    this._now = now;
  }

  immediate (midiMessage: MidiMessage) {
    if (!this._outputManager) return;
    this._outputManager.send(midiMessage);
  }

  addCue (midiMessage: MidiMessage, tick: number) {
    if (!this._outputManager) return;
    this._outputManager.send(midiMessage, this._now() + timeConverter.toMs(tick));
  }

  playClip (clip: Clip): void {
    if (!this._outputManager) throw new Error('outputManager is not set');
    const noteActions = clip.sortedNoteActions;
    const noteControl = {};
    noteActions.forEach(noteAction => {
      const noteOffsetTime = noteAction.parent.offsetTime;
      if (noteAction.type === NOTE_ON) {
        if (!this._outputManager) return;
        noteControl[noteAction.noteId] = this._outputManager.noteOn(
          noteAction,
          this._now() + timeConverter.toMs(noteOffsetTime)
        );
      }
      if (noteAction.type === MODULATION) {
        const nc = noteControl[noteAction.noteId];
        if (!nc) return;
        nc.modulate(
          noteAction,
          this._now() + timeConverter.toMs(noteOffsetTime + noteAction.offsetTime));
      }
      if (noteAction.type === NOTE_OFF) {
        const nc = noteControl[noteAction.noteId];
        if (!nc) return;
        nc.noteOff(
          noteAction,
          this._now() + timeConverter.toMs(noteOffsetTime + noteAction.offsetTime));
      }
    });
  }

  playNote (note: Note): void {
    // TODO
    console.log('Playing note', note);
  }
}
