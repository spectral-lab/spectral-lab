// @flow
import { keyBindingTemplate } from '../../templates/keyBinding';
import type { KeyBinding } from '../../../types';
import hotkeys from 'hotkeys-js';

export const bindKeys = () => {
  const keyBindings = Object.keys(keyBindingTemplate).map(key => keyBindingTemplate[key]);
  keyBindings.forEach((keyBindingItem: KeyBinding) => {
    hotkeys(keyBindingItem.keys, keyBindingItem.scope, (...args) => {
      const event: Event = args[0];
      event.preventDefault();
      keyBindingItem.keyHandler(...args);
    });
  });
};
