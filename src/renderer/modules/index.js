// @flow
import { MidiPlayer } from './helpers/MidiPlayer';
import { OutputManager } from './outputManager';
import { MidiIoFacade } from './helpers/MidiIoFacade';
import { Scheduler } from './helpers/Scheduler';
import { TimeConverter } from './helpers/TimeConverter';
import { SmfGenerator } from './helpers/SmfGenerator';
import { MidiWriter } from './helpers/MidiWriter';

export const timeConverter = new TimeConverter();
const midiIoFacade = new MidiIoFacade(navigator);
const outputManager = new OutputManager((message, timestamp) => midiIoFacade.send(message, timestamp));
const offlineOutputManager = new OutputManager();
const scheduler = new Scheduler(outputManager, () => window.performance.now(), timeConverter);
const smfGenerator = new SmfGenerator(offlineOutputManager);
export const midiPlayer = new MidiPlayer(scheduler);
export const midiWriter = new MidiWriter(smfGenerator);
