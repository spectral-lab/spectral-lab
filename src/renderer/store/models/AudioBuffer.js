import { makeMandatory } from '../utils';
import { AUDIO_BUFFER } from '../../constants/model-types';
import { BaseModel, Spectrogram, Clip } from '.';

export default class AudioBuffer extends BaseModel {
  static get entity () {
    return 'audioBuffers';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(AUDIO_BUFFER),
      clipId: this.attr(null, makeMandatory('clipId')),
      offsetTime: this.number(0),
      data: this.attr(null),
      originalFilePath: this.string(''),
      spectrogram: this.hasOne(Spectrogram, 'audioBufferId')
    };
  }

  get parent () {
    return Clip.query().whereId(this.clipId).first();
  }
}
