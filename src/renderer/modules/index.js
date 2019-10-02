// @flow
/**
 * Instanciate and export modules
 */
import { MidiPlayer } from './defs/MidiPlayer';
import { MidiMessageGenerator } from './defs/MidiMessageGenerator';
import { MidiIoFacade } from './defs/MidiIoFacade';
import { Scheduler } from './defs/Scheduler';
import { TimeConverter } from './defs/TimeConverter';
import { SmfGenerator } from './defs/SmfGenerator';
import { MidiWriter } from './defs/MidiWriter';
import { AudioPlayer } from './defs/AudioPlayer';
import { TemplateGenerator } from './defs/TemplateGenerator';
import { userInputTemplates } from '../templates/user-input';

export const timeConverter = new TimeConverter();
const midiIoFacade = new MidiIoFacade(navigator);
const midiMessageGenerator = new MidiMessageGenerator((message, timestamp) => midiIoFacade.send(message, timestamp));
const offlineMidiMessageGenerator = new MidiMessageGenerator();
const scheduler = new Scheduler(midiMessageGenerator, () => window.performance.now(), timeConverter);
const smfGenerator = new SmfGenerator(offlineMidiMessageGenerator);
export const templateGenerator = TemplateGenerator({ userInputTemplates });
export const midiPlayer = new MidiPlayer(scheduler);
export const midiWriter = new MidiWriter(smfGenerator);
export const audioPlayer = new AudioPlayer();
export * from './eventHubs';
