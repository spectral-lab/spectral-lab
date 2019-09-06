// @flow
import type { Callable } from '../../types';

export interface IEventHub {
  addListener ((event: any, payload: any) => void): void,
  emit (event: any, payload: any): void
}

export class EventHub implements IEventHub {
  _listeners: Callable[];

  constructor () {
    this._listeners = [];
  }

  addListener (cb: (event: any, payload: any) => void) {
    this._listeners.push(cb);
  }

  emit (event: any, payload: any) {
    this._listeners.forEach(listener => {
      listener(event, payload);
    });
  }
}
