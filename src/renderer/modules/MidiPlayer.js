// @flow
import { IScheduler } from './Scheduler';
import { CLIP, NOTE } from '../../constants/model-types';
import { Clip, Note } from '../store/models';
import { allNotesOff } from '../utils/helpers/allNotesOff';

export interface IMidiPlayer {
  play(item: Clip | Note): void;
  testTone(): void;
  allNotesOff(): void;
}

export class MidiPlayer implements IMidiPlayer {
  scheduler: IScheduler;

  constructor (scheduler: IScheduler) {
    this.scheduler = scheduler;
  }

  play (item: Clip | Note) {
    switch (item.type) {
      case CLIP: return this.scheduler.playClip(item);
      case NOTE: return this.scheduler.playNote(item);
    }
  }

  testTone () {
    const noteOnMessage = [0x91, 69, 0x7f];
    const noteOffMessage = [0x81, 69, 0x40];
    this.scheduler.immediate(noteOnMessage);
    this.scheduler.timeout(noteOffMessage, 480);
  }

  allNotesOff () {
    allNotesOff(message => this.scheduler.immediate(message));
  }
}
