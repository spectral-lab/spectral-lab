// @flow
import type { IOutputManager } from './OutputManager';
import { Clip, Note } from '../store/models';
import { MODULATION, NOTE_OFF, NOTE_ON } from '../../constants/model-types';
import type { MidiMessage, Now } from '../../types';
import type { ITimeConverter } from './TimeConverter';

export interface IScheduler {
  immediate(midiMessage: MidiMessage): void;
  timeout(midiMessage: MidiMessage, tick: number): void;
  playClip(clip: Clip): void;
  playNote(note: Note): void;
}

export class Scheduler implements IScheduler {
  _outputManager: IOutputManager;

  _now: Now;

  _timeConverter: ITimeConverter;

  constructor (outputManager: IOutputManager, now: Now, timeConverter: ITimeConverter) {
    this._outputManager = outputManager;
    this._now = now;
    this._timeConverter = timeConverter;
  }

  immediate (midiMessage: MidiMessage) {
    this._outputManager.send && this._outputManager.send(midiMessage);
  }

  timeout (midiMessage: MidiMessage, tick: number) {
    // $FlowFixMe
    this._outputManager.send && this._outputManager.send(midiMessage, this._now() + this._timeConverter.toMs(tick));
  }

  playClip (clip: Clip): void {
    const noteActions = clip.sortedNoteActions;
    const noteControl = {};
    noteActions.forEach(noteAction => {
      const noteOffsetTime = noteAction.parent.offsetTime;
      if (noteAction.type === NOTE_ON) {
        if (!this._outputManager) return;
        noteControl[noteAction.noteId] = this._outputManager.noteOn(
          noteAction,
          this._now() + this._timeConverter.toMs(noteOffsetTime)
        );
      }
      if (noteAction.type === MODULATION) {
        const nc = noteControl[noteAction.noteId];
        if (!nc) return;
        nc.modulate(
          noteAction,
          this._now() + this._timeConverter.toMs(noteOffsetTime + noteAction.offsetTime));
      }
      if (noteAction.type === NOTE_OFF) {
        const nc = noteControl[noteAction.noteId];
        if (!nc) return;
        nc.noteOff(
          noteAction,
          this._now() + this._timeConverter.toMs(noteOffsetTime + noteAction.offsetTime));
      }
    });
  }

  playNote (note: Note): void {
    // TODO
    console.log('Playing note', note);
  }
}
