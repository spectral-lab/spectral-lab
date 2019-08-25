// @flow
import { MidiPlayer } from './helpers/MidiPlayer';
import { OutputManager } from './outputManager';
import { MidiIoFacade } from './helpers/MidiIoFacade';
import { Scheduler } from './helpers/Scheduler';

const midiIoFacade = new MidiIoFacade(navigator);
const outputManager = new OutputManager((...args) => midiIoFacade.send(...args));
const scheduler = new Scheduler(outputManager, () => window.performance.now());
export const midiPlayer = new MidiPlayer(scheduler);
