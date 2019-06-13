import '../typedef';
import { NOTE_ON } from '../constants/defaults';
import { pick } from 'lodash';

const properties = ['time', 'pitch', 'power', 'timbre'];
let id = 0;

/**
 * Instances of `Note` class are put in `store` as a state
 * and will then be converted into MIDI
 * */
class Note {
  /**
   * @param {Modulation} newNoteOn
   * */
  constructor (newNoteOn) {
    this._id = id;
    id++;
    this._noteOn = Object.assign({}, NOTE_ON, pick(newNoteOn, properties));
    this._modulations = [];
    this._duration = null;
  }
  /**
   * @param  {Array.<Modulation>} newModulations
   */
  append (...newModulations) {
    newModulations.forEach((mod) => {
      const modulationToAdd = Object.assign({}, pick(mod, properties));
      if (modulationToAdd.hasOwnProperty('time')) {
        // @ts-ignore
        this._modulations.push(modulationToAdd);
        return;
      }
      console.error('Modulation has not been appended. Modulation must have `time` property.');
    });
  }
  /**
   * @param  {Array.<Modulation>} transition
   */
  static from (transition) {
    const note = new Note(transition[0]);
    note.append(...transition.slice(1));
    return note;
  }

  get duration () {
    return this._duration;
  }

  get id () {
    return this._id;
  }

  get noteOn () {
    return Object.assign({}, this._noteOn);
  }

  get modulations () {
    return [...this._modulations];
  }

  get transition () {
    return [this._noteOn, ...this._modulations];
  }

  get pitchTransition () {
    const transition = [this._noteOn, ...this._modulations.filter((modulation) => modulation.hasOwnProperty('pitch'))];
    return transition.map(modulation => pick(modulation, ['time', 'pitch']));
  }

  get powerTransition () {
    const transition = [this._noteOn, ...this._modulations.filter((modulation) => modulation.hasOwnProperty('power'))];
    return transition.map(modulation => pick(modulation, ['time', 'power']));
  }

  get timbreTransition () {
    const transition = [this._noteOn, ...this._modulations.filter((modulation) => modulation.hasOwnProperty('timbre'))];
    return transition.map(modulation => pick(modulation, ['time', 'timbre']));
  }
}

export default Note;
