import { CREATE_NOTE, MODULATE_NOTE } from '../../action-types';
import { APPEND_NOTE, INSERT_MODULATION } from '../../mutation-types';
import { pick } from 'lodash';
import NoteFactory from '../../../classes/NoteFactory';
import * as modulationTypes from '../../../constants/modulation-types';
import * as noteActionTypes from '../../../constants/note-action-types';
import '../../../typedef';

const noteFactory = new NoteFactory();
const modulationProperties = ['type', 'offsetTime', ...Object.values(modulationTypes)];

export default {
  /**
   * @param  {object} commit
   * @param  {object} materials either (time and pitch) or (time and noteNumber) is necessary
   * @example
   * const noteId = this.$store.dispatch('CREATE_NOTE', {
   *   time: 0.2,
   *   noteNumber: 60,
   *   pitchBend: 0.6,
   *   noteOnVelocity: 0.1,
   *   timbre: 0.5,
   *   pressure: 0.4
   * });
   *
   * // or
   *
   * const noteId = this.$store.dispatch('CREATE_NOTE', {
   *   time: 0.2,
   *   // `pitch` property will be converted to `noteNumber` + `pitchBend`
   *   pitch: 60.6
   *   // Default values are used for omitted properties.
   * });
   *
   */
  [CREATE_NOTE] ({ commit }, materials) {
    const note = noteFactory.createNote(materials);
    commit(APPEND_NOTE, note);
    return note.id;
  },
  /**
   * @param  {object} dispatch
   * @param  {object} payload
   * @param  {number} payload.id ID of target note to modulate
   * @param  {object} payload.modulation
   * @example
   * const noteId = this.$store.dispatch('CREATE_NOTE', {time: 0.2, pitch: 60.6});
   * this.$store.dispatch('MODULATE_NOTE', {
   *   id: noteId,
   *   modulation: {
   *     offseTime: 2,
   *     pitchBend: 0.6
   *   }
   * });
   *
   * // or
   * const noteId = this.$store.dispatch('CREATE_NOTE', {time: 0.2, pitch: 60.6});
   * this.$store.dispatch('MODULATE_NOTE', {
   *   id: noteId,
   *   modulation: {
   *     time: 2.2, // Shorthand for `offsetTime`. `offsetTime` = `modulation.time` - `noteOn.time`
   *     pitch: 60.6 // Shorthand for `pitchBend`. `pitchBend` = `modulation.pitchBend` - `noteOn.noteNumber`
   *   }
   * });
   */
  async [MODULATE_NOTE] ({ dispatch, commit }, { id, modulation }) {
    const formatted = await dispatch('formatModulation', { modulation, id });
    commit(INSERT_MODULATION, { id, modulation: formatted });
  },
  formatModulation ({ state }, { modulation, id }) {
    const _modulation = Object.assign({}, modulation);
    _modulation.type = noteActionTypes.MODULATION;
    const targetNote = state.data.find(note => note.id === id);
    if (_modulation.offsetTime == null) {
      if (_modulation.time != null) {
        _modulation.offsetTime = _modulation.time - targetNote.noteOn.time;
      } else {
        throw new Error('Modulation has not been applied. Modulation must have `offsetTime` or `time` property.');
      }
    }
    if (_modulation.offsetTime < 0) {
      _modulation.offsetTime = 0;
    }
    if (_modulation.pitch != null && _modulation.pitchBend == null) {
      _modulation.pitchBend = _modulation.pitch - targetNote.noteOn.noteNumber;
    }
    validateModulation(_modulation);
    return pick(_modulation, modulationProperties);
  }
};

const validateModulation = (mod) => {
  if (mod.offsetTime != null) {
    if (mod.pitchBend != null) return;
    if (mod.timbre != null) return;
    if (mod.pressure != null) return;
  };
  throw new Error('Invalid modulation');
};
