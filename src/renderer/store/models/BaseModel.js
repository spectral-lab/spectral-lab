// @flow
import { Model } from '@vuex-orm/core';
import { sumBy } from 'lodash';

export default class BaseModel extends Model {
  get path () {
    if (!this.parent) return [this];
    return [...this.parent.path, this];
  }

  get absoluteTime () {
    return sumBy(this.path, modelInstance => {
      return modelInstance.offsetTime ? modelInstance.offsetTime : 0;
    });
  }

  get parent () {
    return null;
  }
}
