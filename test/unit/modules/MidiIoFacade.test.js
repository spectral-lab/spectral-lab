// @flow
import { MidiIoFacade } from '../../../src/renderer/modules/helpers/MidiIoFacade';

describe('Constructor of MidiIoFacade class', () => {
  test('instantiates', () => {
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve() } : any));
    expect(midiIoFacade).toBeInstanceOf(MidiIoFacade);
  });
  test('throws Error without `requestMIDIAccess`', () => {
    expect(() => new MidiIoFacade(({}: any))).toThrowError();
  });
});

describe('Methods of MidiIoFacade', () => {
  test('get inputs', (done) => {
    const midiAccess = {
      inputs: [1, 2, 3]
    };
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    expect(midiIoFacade.inputs).toBe(null);
    setTimeout(() => {
      expect(midiIoFacade.inputs).toEqual([1, 2, 3]);
      done();
    }, 0);
  });
  test('get outputs', (done) => {
    const midiAccess = {
      outputs: [3, 2, 1]
    };
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    expect(midiIoFacade.outputs).toBe(null);
    setTimeout(() => {
      expect(midiIoFacade.outputs).toEqual([3, 2, 1]);
      done();
    }, 0);
  });
  test('call send', () => {
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve({}) } : any));
    const mockSend = jest.fn();
    midiIoFacade.midiOutput = { send: mockSend };
    midiIoFacade.send([60, 60, 60], 480);
    expect(mockSend.mock.calls[0][0]).toEqual([60, 60, 60]);
    expect(mockSend.mock.calls[0][1]).toBe(480);
  });
  test('set MidiInput by Id', (done) => {
    const mockGet = jest.fn(() => []);
    const midiAccess = {
      inputs: {
        get: mockGet
      }
    };
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    setTimeout(() => {
      midiIoFacade.setMidiInputById('1');
      expect(mockGet.mock.calls[0][0]).toEqual('1');
      done();
    }, 0);
  });
  test('set MidiOutput by Id', (done) => {
    const mockGet = jest.fn();
    const midiAccess = {
      outputs: {
        get: mockGet
      }
    };
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    setTimeout(() => {
      midiIoFacade.setMidiOutputById('2');
      expect(mockGet.mock.calls[0][0]).toEqual('2');
      done();
    }, 0);
  });
});
