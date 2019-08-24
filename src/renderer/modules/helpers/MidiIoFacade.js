// @flow
import type { Send } from '../../../types';

export interface IMidiIoFacade {
  +inputs: MIDIInputMap | null;
  +outputs: MIDIOutputMap | null;
  +send: Send;
  setMidiInputById(id: string): void;
  setMidiOutputById(id: string): void;
}

/**
 * Help access external Midi Devices
 * with Web Midi API
 */
export class MidiIoFacade implements IMidiIoFacade {
  midiAccess: MIDIAccess | null;

  midiInput: any;

  midiOutput: any;

  constructor (navigator: Navigator) {
    this.midiAccess = null;
    this.midiInput = null;
    this.midiOutput = null;
    if (!navigator.requestMIDIAccess) throw new Error('This device does not support MIDI');
    debugger;
    navigator.requestMIDIAccess()
      .then(midiAccess => this.onMidiSuccess(midiAccess), msg => this.onMidiFailure(msg))
      .catch(console.error);
  }

  onMidiSuccess (midiAccess :MIDIAccess) {
    this.midiAccess = midiAccess;
    if (!this.inputs) return;
    this.midiInput = this.inputs.get(this.inputIds[0]);
    if (!this.outputs) return;
    this.midiOutput = this.outputs.get(this.outputIds[0]);
  }

  onMidiFailure (msg: string) {
    throw new Error(msg);
  }

  send (...args: any) {
    if (!this.midiOutput) return;
    this.midiOutput.send(...args);
  }

  setMidiInputById (id: string) {
    if (!this.inputs) return;
    this.midiInput = this.inputs.get(id);
  }

  setMidiOutputById (id: string) {
    if (!this.outputs) return;
    this.midiOutput = this.outputs.get(id);
  }

  get inputIds () {
    if (!this.midiAccess) return [];
    const ids = [];
    this.midiAccess.inputs.forEach(input => ids.push(input.id));
    return ids;
  }

  get outputIds () {
    if (!this.midiAccess) return [];
    const ids = [];
    this.midiAccess.outputs.forEach(output => ids.push(output.id));
    return ids;
  }

  get inputs () {
    if (!this.midiAccess) return null;
    return this.midiAccess.inputs;
  }

  get outputs () {
    if (!this.midiAccess) return null;
    return this.midiAccess.outputs;
  }
}
