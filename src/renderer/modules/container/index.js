// @flow
/**
 * Instanciate and export modules
 */
import { MidiPlayer } from '../definitions/MidiPlayer';
import { MidiMessageGenerator } from '../definitions/MidiMessageGenerator';
import { MidiIoFacade } from '../definitions/MidiIoFacade';
import { Scheduler } from '../definitions/Scheduler';
import { TimeConverter } from '../definitions/TimeConverter';
import { SmfGenerator } from '../definitions/SmfGenerator';
import { MidiWriter } from '../definitions/MidiWriter';
import { AudioPlayer } from '../definitions/AudioPlayer';
import { TemplateGenerator } from '../definitions/TemplateGenerator';
import { userInputTemplates } from '../../templates/user-input';

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
