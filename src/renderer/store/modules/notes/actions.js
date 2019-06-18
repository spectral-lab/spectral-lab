import { CREATE_NOTE, MODULATE_NOTE, RELEASE_NOTE } from '../../action-types';
import { APPEND_NOTE, INSERT_MODULATION, INSERT_NOTE_OFF } from '../../mutation-types';
import NoteFactory from '../../../classes/NoteFactory';
import '../../../typedef';
import { formatModulation, formatNoteOff } from '../../../utils/helpers/formatNoteAction';

const noteFactory = new NoteFactory();

export default {
  /**
   * @param  {object} context
   * @param  {object} materials either (time and pitch) or (time and noteNumber) is necessary
   * @example
   * const noteId = await this.$store.dispatch('CREATE_NOTE', {
   *   time: 0.2,
   *   noteNumber: 60,
   *   pitchBend: 0.6,
   *   noteOnVelocity: 0.5,
   *   timbre: 0.5,
   *   pressure: 0.5
   * });
   *
   * // This second example is a shorthand of the above
   * const noteId = await this.$store.dispatch('CREATE_NOTE', {
   *   time: 0.2,
   *   pitch: 60.6 // `pitch` property will be converted to `noteNumber` + `pitchBend`
   *   // Default values are used for omitted properties.
   * });
   */
  [CREATE_NOTE] ({ commit }, materials) {
    const note = noteFactory.createNote(materials);
    commit(APPEND_NOTE, note);
    return note.id;
  },
  /**
   * @param  {object} context
   * @param  {object} payload
   * @param  {number} payload.id ID of target note to modulate
   * @param  {object} payload.modulation
   * @example
   * const noteId = await this.$store.dispatch('CREATE_NOTE', { time: 0.2, pitch: 60 });
   * this.$store.dispatch('MODULATE_NOTE', {
   *   id: noteId,
   *   modulation: {
   *     offseTime: 2,
   *     pitchBend: 0.6
   *   }
   * });
   *
   * // This second example is a shorthand of the above
   * const noteId = await this.$store.dispatch('CREATE_NOTE', { time: 0.2, pitch: 60 });
   * this.$store.dispatch('MODULATE_NOTE', {
   *   id: noteId,
   *   modulation: {
   *     time: 2.2, // Shorthand for `offsetTime`. `offsetTime` = `modulation.time` - `noteOn.time`
   *     pitch: 60.6 // Shorthand for `pitchBend`. `pitchBend` = `modulation.pitchBend` - `noteOn.noteNumber`
   *   }
   * });
   */
  [MODULATE_NOTE] ({ state, commit }, { id, modulation }) {
    const targetNote = state.data.find(note => note.id === id);
    const formatted = formatModulation({ modulation, targetNote });
    commit(INSERT_MODULATION, { id, modulation: formatted });
  },
  /**
   * @param  {object} context
   * @param  {object} payload
   * @param  {number} payload.id ID of target note to modulate
   * @param  {object} payload.noteOff
   * @example
   * const noteId = await this.$store.dispatch('CREATE_NOTE', { time: 0.2, pitch: 60.6 });
   * this.$store.dispatch('RELEASE_NOTE', {
   *   id: noteId,
   *   modulation: {
   *     offseTime: 2,
   *     noteOffVelocity: 0.6
   *   }
   * });
   *
   * // This second example is a shorthand of the above
   * const noteId = await this.$store.dispatch('CREATE_NOTE', { time: 0.2, pitch: 60.6 });
   * this.$store.dispatch('RELEASE_NOTE', {
   *   id: noteId,
   *   noteOff: {
   *     time: 2.2, // Shorthand for `offsetTime`. `offsetTime` = `noteOff.time` - `noteOn.time`
   *     // If `noteOffVelocity` is ommited, default value 0 will be used.
   *   }
   * });
   */
  [RELEASE_NOTE] ({ state, commit }, { id, noteOff }) {
    const targetNote = state.data.find(note => note.id === id);
    const formatted = formatNoteOff({ noteOff, targetNote });
    commit(INSERT_NOTE_OFF, { id, noteOff: formatted });
  }
};
