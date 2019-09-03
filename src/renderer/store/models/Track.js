// @flow

import { makeMandatory } from '../utils';
import { TRACK } from '../../../constants/model-types';
import { Song, BaseModel, Clip } from '.';
import { SCALE_COLORS } from '../../../constants/colors';
import { random } from 'lodash';

export default class Track extends BaseModel {
  static get entity () {
    return 'tracks';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      name: this.string('Track'),
      color: this.attr(() => SCALE_COLORS.aScriabin[random(11)]),
      type: this.string(TRACK),
      speed: this.attr([{ offsetTime: 0, val: 1 }]),
      selected: this.boolean(false),
      songId: this.attr(null, makeMandatory('songId')),
      clips: this.hasMany(Clip, 'trackId')
    };
  }

  get parent () {
    return Song.query().whereId(this.songId).first();
  }
}
