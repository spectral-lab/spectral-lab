// @flow
import { MidiPlayer } from './MidiPlayer';
import { OutputManager } from './OutputManager';
import { MidiIoFacade } from './MidiIoFacade';
import { Scheduler } from './Scheduler';
import { TimeConverter } from './TimeConverter';
import { SmfGenerator } from './SmfGenerator';
import { MidiWriter } from './MidiWriter';

export const timeConverter = new TimeConverter();
const midiIoFacade = new MidiIoFacade(navigator);
const outputManager = new OutputManager((message, timestamp) => midiIoFacade.send(message, timestamp));
const offlineOutputManager = new OutputManager();
const scheduler = new Scheduler(outputManager, () => window.performance.now(), timeConverter);
const smfGenerator = new SmfGenerator(offlineOutputManager);
export const midiPlayer = new MidiPlayer(scheduler);
export const midiWriter = new MidiWriter(smfGenerator);
