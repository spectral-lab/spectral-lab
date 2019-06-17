import { APPEND_NOTE, INSERT_MODULATION } from '../../mutation-types';
import { findLastIndex } from 'lodash';

const insert = (n, ins, arr) => [...arr.slice(0, n), ins, ...arr.slice(n)];

export default {
  [APPEND_NOTE] (state, newNote) {
    state.data = [...state.data, newNote];
  },
  /**
   * @param  {Array.<Modulation>} newModulations
   */
  [INSERT_MODULATION] (state, { id, modulation }) {
    const targetNote = state.data.find(note => note.id === id);
    const idx = findLastIndex(targetNote.modulations, (m) => m.offsetTime < modulation.offsetTime) + 1;
    targetNote.modulations = insert(idx, modulation, targetNote.modulations);
  }
};
