// @flow
import type { Send } from '../../../types';
import { pick } from 'lodash';

type PortInfo = {
  id: string,
  name?: string,
  type?: string,
  manufacturer?: string,
  version?: string
};

export interface IMidiIoFacade {
  listAvailableInputs(): Array<PortInfo>;
  listAvailableOutputs(): Array<PortInfo>;
  +send: Send;
  +output: any;
  +input: any;
  setInputById(id: string): void;
  setOutputById(id: string): void;
}

/**
 * Help access external Midi Devices
 * with Web Midi API
 */
export class MidiIoFacade implements IMidiIoFacade {
  _midiAccess: MIDIAccess | null;

  _midiInput: any;

  _midiOutput: any;

  constructor (navigator: Navigator) {
    this._midiAccess = null;
    this._midiInput = null;
    this._midiOutput = null;
    if (!navigator.requestMIDIAccess) throw new Error('This device does not support MIDI');
    debugger;
    navigator.requestMIDIAccess()
      .then(midiAccess => this.onMidiSuccess(midiAccess), msg => this.onMidiFailure(msg))
      .catch(console.error);
  }

  onMidiSuccess (midiAccess :MIDIAccess) {
    this._midiAccess = midiAccess;
    this._midiInput = this.setInputById(this.listAvailableInputs()[0].id);
    this._midiOutput = this.setOutputById(this.listAvailableOutputs()[0].id);
  }

  onMidiFailure (msg: string) {
    throw new Error(msg);
  }

  send (...args: any) {
    if (!this._midiOutput) return;
    this._midiOutput.send(...args);
  }

  setInputById (id: string) {
    if (!this._midiAccess) return;
    this._midiInput = this._midiAccess.inputs.get(id);
  }

  setOutputById (id: string) {
    if (!this._midiAccess) return;
    this._midiOutput = this._midiAccess.outputs.get(id);
  }

  get input () {
    return this._midiInput;
  }

  get output () {
    return this._midiOutput;
  }

  listAvailableInputs () {
    if (!this._midiAccess) return [];
    const list = [];
    this._midiAccess.inputs.forEach(input => {
      const portInfo = pick(input, ['id', 'name', 'type', 'manufacturer', 'version']);
      list.push(portInfo);
    });
    return list;
  }

  listAvailableOutputs () {
    if (!this._midiAccess) return [];
    const list = [];
    this._midiAccess.outputs.forEach(output => {
      const portInfo = pick(output, ['id', 'name', 'type', 'manufacturer', 'version']);
      list.push(portInfo);
    });
    return list;
  }
}
