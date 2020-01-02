// @flow
import { makeMandatory, setHotkeysScope } from '../store/utils';
import { APP } from '../../constants/model-types';
import { Arrangement, BaseModel, PianoRoll } from './index';

export default class App extends BaseModel {
  static get entity () {
    return 'app';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(APP),
      version: this.string(null),
      selectedZone: this.string(null, setHotkeysScope),
      pianoRoll: this.hasOne(PianoRoll, 'appId'),
      arrangement: this.hasOne(Arrangement, 'appId')
    };
  }

  get parent () {
    return null;
  }
}
