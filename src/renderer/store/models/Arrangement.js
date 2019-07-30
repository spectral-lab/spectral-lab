import { makeMandatory } from '../utils';
import { ARRANGEMENT } from '../../constants/model-types';
import { SELECT } from '../../constants/mouse-modes';
import { App, BaseModel } from './index';

export default class Arrangement extends BaseModel {
  static get entity () {
    return 'arrangement';
  }
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(ARRANGEMENT),
      appId: this.attr(null, makeMandatory('appId')),
      mouseMode: this.string(SELECT)
    };
  }
  get parent () {
    return App.query().whereId(this.appId).first();
  }
}
