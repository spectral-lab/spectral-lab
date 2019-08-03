import { makeMandatory } from '../utils';
import { SPECTROGRAM } from '../../constants/model-types';
import { BaseModel, AudioBuffer } from '.';

export default class Spectrogram extends BaseModel {
  static get entity () {
    return 'spectrograms';
  }

  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(SPECTROGRAM),
      audioBufferId: this.attr(null),
      times: this.attr([]),
      freqs: this.attr([]),
      magnitude2d: this.attr([[]])
    };
  }

  get parent () {
    return AudioBuffer.query().whereId(this.audioBufferId).first();
  }
}
