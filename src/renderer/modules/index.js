// @flow
import { MidiPlayer } from './helpers/MidiPlayer';
import { OutputManager } from './outputManager';
import { MidiIoFacade } from './helpers/MidiIoFacade';
import { Scheduler } from './helpers/Scheduler';
import { TimeConverter } from './helpers/TimeConverter';

export const timeConverter = new TimeConverter();
const midiIoFacade = new MidiIoFacade(navigator);
const outputManager = new OutputManager((...args) => midiIoFacade.send(...args));
const scheduler = new Scheduler(outputManager, () => window.performance.now(), timeConverter);
export const midiPlayer = new MidiPlayer(scheduler);
