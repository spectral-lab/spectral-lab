import { makeMandatory, setHotkeysScope } from '../utils';
import { APP, PIANO_ROLL } from '../../constants/model-types';
import { BaseModel } from '.';

export default class App extends BaseModel {
  static get entity () {
    return 'app';
  }
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(APP),
      selectedZone: this.string(PIANO_ROLL, setHotkeysScope)
    };
  }
  get parent () {
    return null;
  }
}
