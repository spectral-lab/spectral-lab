// @flow
import { Model } from '@vuex-orm/core';
import { sum } from 'lodash';

export default class BaseModel extends Model {
  get path () {
    if (!this.parent) return [this];
    return [...this.parent.path, this];
  }

  get absoluteTime () {
    const offsetTimes = this.path.map(modelInstance => {
      return modelInstance.offsetTime == null ? 0 : modelInstance.offsetTime;
    });
    return sum(offsetTimes);
  }

  get parent () {
    return null;
  }
}
