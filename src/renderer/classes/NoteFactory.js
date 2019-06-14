import { NOTE_ON } from '../constants/defaults';
import { pick } from 'lodash';
import '../typedef';
const noteOnProperties = ['time', 'pitch', 'pressure', 'timbre', 'noteOnVelocity'];

class NoteFactory {
  constructor () {
    this.id = 0;
  }
  /**
   * @param  {NoteOn} noteOn
   * @returns {{id: number, noteOn: object, modulations: array, duration: number | null}}
   */
  createNote (noteOn) {
    const note = {
      id: this.id,
      noteOn: Object.assign({}, NOTE_ON, pick(noteOn, noteOnProperties)),
      modulations: [],
      duration: null
    };
    this.id++;
    return note;
  }
}

export default NoteFactory;
