// @flow
import { Model } from '@vuex-orm/core';
import { sumBy } from 'lodash';

export default class BaseModel extends Model {
  get ancestors () {
    if (!this.parent) return [];
    return [...this.parent.ancestors, this.parent];
  }

  get absoluteTime () {
    return sumBy(
      [...this.ancestors, this],
      modelInstance => modelInstance.offsetTime || 0
    );
  }

  get parent () {
    return null;
  }
}
