import { Send } from '../../../types';
import { noteOffMessage } from '../midi/formatMidiMessage';
import { range } from 'lodash';
export const allNotesOff = (send: Send) => {
  range(1, 17).forEach(channel => {
    range(128).forEach(noteNumber => {
      send(noteOffMessage(noteNumber, 0, channel));
    });
  });
};

export default allNotesOff;
