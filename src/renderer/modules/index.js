// @flow
import { MidiPlayer } from './MidiPlayer';
import { MidiMessageGenerator } from './MidiMessageGenerator';
import { MidiIoFacade } from './MidiIoFacade';
import { Scheduler } from './Scheduler';
import { TimeConverter } from './TimeConverter';
import { SmfGenerator } from './SmfGenerator';
import { MidiWriter } from './MidiWriter';
import { AudioPlayer } from './AudioPlayer';

export const timeConverter = new TimeConverter();
const midiIoFacade = new MidiIoFacade(navigator);
const midiMessageGenerator = new MidiMessageGenerator((message, timestamp) => midiIoFacade.send(message, timestamp));
const offlineMidiMessageGenerator = new MidiMessageGenerator();
const scheduler = new Scheduler(midiMessageGenerator, () => window.performance.now(), timeConverter);
const smfGenerator = new SmfGenerator(offlineMidiMessageGenerator);
export const midiPlayer = new MidiPlayer(scheduler);
export const midiWriter = new MidiWriter(smfGenerator);
export const audioPlayer = new AudioPlayer();
