import { Model } from '@vuex-orm/core';
import { sum } from 'lodash';

export default class BaseModel extends Model {
  get path () {
    if (!this.parent) return [this];
    return [...this.parent.path, this];
  }

  get absoluteTime () {
    const offsetTimes = this.path.map(modelInstance => {
      const offset = modelInstance.offsetTime;
      return offset == null ? 0 : offset;
    });
    return sum(offsetTimes);
  }

  get parent () {
    return null;
  }
}
