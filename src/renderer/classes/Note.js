import '../typedef';
import { defaultNoteOn } from '../constants/defaults';
import { pick } from 'lodash';

const properties = ['time', 'pitch', 'power', 'timbre'];
let id = 0;

/**
 * Instances of `Note` class are put in `store` as a state
 * and will then be converted into MIDI
 * */
class Note {
  /**
   * @param {Modulation} noteOn
   * */
  constructor (noteOn) {
    this.id = id;
    id++;
    /** @type {Array.<Modulation>} */
    this.transition = [Object.assign({}, defaultNoteOn, pick(noteOn, properties))];
  }
  /**
   * @param  {Array.<Modulation>} modulations
   */
  append (...modulations) {
    modulations.forEach((modulation) => {
      const modulationToAdd = Object.assign({}, pick(modulation, properties));
      if (modulationToAdd.hasOwnProperty('time')) {
        // @ts-ignore
        this.transition.push(modulationToAdd);
        return;
      }
      console.error('Modulation has not been appended. Modulation must have `time` property.');
    });
  }
  /**
   * @param  {Array.<Modulation>} modulations
   */
  static from (modulations) {
    const note = new Note(modulations[0]);
    note.append(...modulations.slice(1));
    return note;
  }

  get pitchTransition () {
    const transition = this.transition.filter((modulation) => modulation.hasOwnProperty('pitch'));
    return transition.map(modulation => pick(modulation, ['time', 'pitch']));
  }

  get powerTransition () {
    const transition = this.transition.filter((modulation) => modulation.hasOwnProperty('power'));
    return transition.map(modulation => pick(modulation, ['time', 'power']));
  }

  get timbreTransition () {
    const transition = this.transition.filter((modulation) => modulation.hasOwnProperty('timbre'));
    return transition.map(modulation => pick(modulation, ['time', 'timbre']));
  }
}

export default Note;
