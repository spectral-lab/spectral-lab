// @flow
import { MidiIoFacade } from '../../../src/renderer/modules/definitions/MidiIoFacade';

const genMock = () => {
  const midiInput1 = {
    id: '1',
    name: 'IAC Driver'
  };
  const midiInput2 = {
    id: '2',
    name: 'Apple Synth'
  };
  const midiOutput1 = {
    id: '1',
    send: jest.fn()
  };
  const midiOutput2 = {
    id: '2',
    send: jest.fn()
  };
  const midiAccess = {
    inputs: {
      get: (id) => {
        if (id === '1') return midiInput1;
        if (id === '2') return midiInput2;
      },
      forEach: (cb) => { cb(midiInput1); cb(midiInput2); },
      values: () => ({
        next: () => ({
          value: midiInput1
        })
      })
    },
    outputs: {
      get: (id) => {
        if (id === '1') return midiOutput1;
        if (id === '2') return midiOutput2;
      },
      forEach: (cb) => { cb(midiOutput1); cb(midiOutput2); },
      values: () => ({
        next: () => ({
          value: midiOutput1
        })
      })
    }
  };
  return {
    midiInput1,
    midiInput2,
    midiOutput1,
    midiOutput2,
    midiAccess
  };
};

describe('Constructor of MidiIoFacade class', () => {
  test('instantiates', () => {
    const { midiAccess } = genMock();
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    expect(midiIoFacade).toBeInstanceOf(MidiIoFacade);
  });
  test('throws Error without `requestMIDIAccess`', () => {
    expect(() => new MidiIoFacade(({}: any))).toThrowError();
  });
});

describe('Methods of MidiIoFacade', () => {
  test('get available inputs', (done) => {
    const { midiAccess } = genMock();
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    expect(midiIoFacade.listAvailableInputs()).toEqual([]);
    setTimeout(() => {
      expect(midiIoFacade.listAvailableInputs()[0]).toHaveProperty('id');
      expect(midiIoFacade.listAvailableInputs()[1]).toHaveProperty('name');
      done();
    }, 0);
  });
  test('get available outputs', (done) => {
    const { midiAccess } = genMock();
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    expect(midiIoFacade.listAvailableOutputs()).toEqual([]);
    setTimeout(() => {
      expect(midiIoFacade.listAvailableInputs()[0]).toHaveProperty('id');
      expect(midiIoFacade.listAvailableInputs()[1]).not.toHaveProperty('send');
      done();
    }, 0);
  });
  test('send midi messages', (done) => {
    const { midiAccess, midiOutput1, midiOutput2 } = genMock();
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    setTimeout(() => {
      midiIoFacade.setOutputById('1');
      midiIoFacade.send([60, 60, 60], 480);
      expect(midiOutput1.send.mock.calls[0][0]).toEqual([60, 60, 60]);
      expect(midiOutput1.send.mock.calls[0][1]).toBe(480);
      midiIoFacade.setOutputById('2');
      midiIoFacade.send([120, 120, 120], 960);
      expect(midiOutput2.send.mock.calls[0][0]).toEqual([120, 120, 120]);
      expect(midiOutput2.send.mock.calls[0][1]).toBe(960);
      done();
    }, 0);
  });
  test('set MidiInput by Id', (done) => {
    const { midiAccess } = genMock();
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    setTimeout(() => {
      midiIoFacade.setInputById('1');
      expect(midiIoFacade.input).toHaveProperty('id', '1');
      expect(midiIoFacade.input).toHaveProperty('name', 'IAC Driver');
      done();
    }, 0);
  });
  test('set MidiOutput by Id', (done) => {
    const { midiAccess } = genMock();
    const midiIoFacade = new MidiIoFacade(({ requestMIDIAccess: () => Promise.resolve(midiAccess) } : any));
    setTimeout(() => {
      midiIoFacade.setOutputById('2');
      expect(midiIoFacade.output).toHaveProperty('id', '2');
      expect(midiIoFacade.output).toHaveProperty('send');
      done();
    }, 0);
  });
});
