import type { IOutputManager } from './outputManager';
import { Clip } from '../store/models';
import { MODULATION, NOTE_OFF, NOTE_ON } from '../../constants/model-types';
import JZZ from 'jzz';
import type { NoteAction } from '../../types';
import JzzMidiSmf from 'jzz-midi-smf';

JzzMidiSmf(JZZ);

export type MTrk = JZZ.MIDI.SMF.MTrk;
export type SMF = JZZ.MIDI.SMF;

export interface ISmfGenerator {
  processClip(clip: Clip): SMF;
}

export class SmfGenerator implements ISmfGenerator {
  _offlineOutputManager: IOutputManager;

  constructor (offlineOutputManager: IOutputManager) {
    this._offlineOutputManager = offlineOutputManager;
  }

  processClip (clip: Clip): SMF {
    if (clip.notes === []) return;
    console.log(`generating SMF from clip ${name}`);
    const { ticksPerBeat } = clip.parent.parent;
    const smf = new JZZ.MIDI.SMF(1, ticksPerBeat);
    smf.push(this.clipToMTrk(clip));
    return smf;
  }

  clipToMTrk (clip: Clip): MTrk {
    const MTrk = new JZZ.MIDI.SMF.MTrk();
    const { bpm } = clip.parent.parent;
    MTrk
      .add(0, JZZ.MIDI.smfSeqName(clip.name || clip.id))
      .add(0, JZZ.MIDI.smfBPM(bpm))
      .add(clip.duration, JZZ.MIDI.smfEndOfTrack());
    this._offlineOutputManager.send = (message, timestamp) => MTrk.add(timestamp, JZZ.MIDI(message));
    this.dumpClip(clip);
    return MTrk;
  }

  dumpClip (clip: Clip): void {
    if (!this._offlineOutputManager) throw new Error('offlineOutputManager is not set');
    const noteActions: NoteAction[] = clip.sortedNoteActions;
    const noteControl = {};
    noteActions.forEach(noteAction => {
      const noteOffsetTime = noteAction.parent.offsetTime;
      if (noteAction.type === NOTE_ON) {
        if (!this._offlineOutputManager) return;
        noteControl[noteAction.noteId] = this._offlineOutputManager.noteOn(
          noteAction,
          noteOffsetTime
        );
      }
      if (noteAction.type === MODULATION) {
        const nc = noteControl[noteAction.noteId];
        if (!nc) return;
        nc.modulate(
          noteAction,
          noteOffsetTime + noteAction.offsetTime);
      }
      if (noteAction.type === NOTE_OFF) {
        const nc = noteControl[noteAction.noteId];
        if (!nc) return;
        nc.noteOff(
          noteAction,
          noteOffsetTime + noteAction.offsetTime);
      }
    });
  }
}
