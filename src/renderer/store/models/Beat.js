// @flow
import { makeMandatory } from '../utils';
import { BEAT } from '../../../constants/model-types';
import { BaseModel, Bar } from '.';

export default class Beat extends BaseModel {
  static get entity () {
    return 'beats';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(BEAT),
      name: this.attr(null),
      offsetTime: this.number(0), // in tick
      barId: this.attr(null)
    };
  };

  get parent () {
    return Bar.query().whereId(this.barId).first();
  }
}
