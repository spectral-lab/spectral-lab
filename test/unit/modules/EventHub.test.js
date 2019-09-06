// @flow
import { EventHub } from '../../../src/renderer/modules/EventHub';

const genMock = () => ({
  event: { type: 'contextmenu' },
  payload: { context: 'clip', id: 'a123' }
});
describe('Constructor of EventHub class', () => {
  test('instantiates', () => {
    const eventHub = new EventHub();
    expect(eventHub).toBeInstanceOf(EventHub);
  });
});

describe('Methods of EventHub', () => {
  test('attach one listener', (done) => {
    const eventHub = new EventHub();
    const { event, payload } = genMock();
    eventHub.addListener((...args) => {
      expect(args).toEqual([event, payload]);
      done();
    });
    eventHub.emit(event, payload);
  });
  test('emit a hundred events', (done) => {
    const eventHub = new EventHub();
    const { event, payload } = genMock();
    let count = 0;
    eventHub.addListener((...args) => {
      expect(args).toEqual([event, payload]);
      count++;
    });
    for (let i = 0; i < 100; i++) {
      eventHub.emit(event, payload);
    }
    setTimeout(() => {
      if (count === 100) done();
    }, 0);
  });
  test('attach a hundred listeners', (done) => {
    const eventHub = new EventHub();
    const { event, payload } = genMock();
    let count = 0;
    for (let i = 0; i < 100; i++) {
      eventHub.addListener((...args) => {
        expect(args).toEqual([event, payload]);
        count++;
      });
    }
    eventHub.emit(event, payload);
    setTimeout(() => {
      if (count === 100) done();
    }, 0);
  });
});
