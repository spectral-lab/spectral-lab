// @flow
import { makeMandatory } from '../utils';
import { BEAT } from '../../../constants/model-types';
import { Clip, BaseModel, Beat } from '.';

export default class Bar extends BaseModel {
  static get entity () {
    return 'bars';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(BEAT),
      name: this.attr(null),
      offsetTime: this.number(0), // in tick
      beats: this.hasMany(Beat, 'barId'),
      clipId: this.attr(null)
    };
  };

  get parent () {
    return Clip.query().whereId(this.clipId).first();
  }

  get numberOfBeats () {
    return this.beats.length;
  }
}
