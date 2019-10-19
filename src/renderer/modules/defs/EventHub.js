// @flow
import type { Callable } from '../../../types';

type Event = Object;
type Payload = {
  type?: string,
  context?: string,
  id?: string
};
export interface IEventHub {
  addListener ((Event, Payload) => void): void,
  emit (Event, Payload): void
}

export class EventHub implements IEventHub {
  _listeners: Callable[];

  constructor () {
    this._listeners = [];
  }

  addListener (cb: (event: Event, payload: Payload) => void) {
    this._listeners.push(cb);
  }

  emit (event: Event, payload: Payload) {
    this._listeners.forEach(listener => {
      listener(event, payload);
    });
  }
}
