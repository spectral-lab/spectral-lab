// @flow
import { makeMandatory, setHotkeysScope } from '../utils';
import { APP, PIANO_ROLL } from '../../../constants/model-types';
import { Arrangement, BaseModel, PianoRoll } from '.';

export default class App extends BaseModel {
  static get entity () {
    return 'app';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(APP),
      selectedZone: this.string(PIANO_ROLL, setHotkeysScope),
      pianoRoll: this.hasOne(PianoRoll, 'appId'),
      arrangement: this.hasOne(Arrangement, 'appId')
    };
  }

  get parent () {
    return null;
  }
}
