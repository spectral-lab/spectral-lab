// @flow
import { audioCtx as ctx } from '../../utils/audio/audioCtx';
import playAudioBuffer from '../../utils/helpers/playAudioBuffer';
import type { Callable } from '../../../types';

export interface IAudioPlayer {
  play(): void;
  stop(): void;
  buffer: AudioBuffer | null;
  onStart: Callable | null;
  onStop: Callable | null;
  +isPlaying: boolean;
}

export class AudioPlayer implements IAudioPlayer {
  buffer: AudioBuffer | null;

  _sourceNode: AudioBufferSourceNode | null;

  onStart: Callable | null;

  onStop: Callable | null;

  constructor (onStop?: Callable, onStart?: Callable) {
    this.buffer = null;
    this._sourceNode = null;
    this.onStart = onStart || null;
    this.onStop = onStop || null;
  }

  play (): void {
    if (!this.buffer) return;
    this._sourceNode = playAudioBuffer(this.buffer, ctx);
    this.onStart && this.onStart();
    this._sourceNode.onended = () => {
      if (this._sourceNode != null) {
        this._sourceNode = null;
        this.onStop && this.onStop();
      }
    };
  }

  stop (): void {
    if (!this.isPlaying) return;
    this._sourceNode && this._sourceNode.stop();
    this._sourceNode = null;
    this.onStop && this.onStop();
  }

  get isPlaying () {
    return Boolean(this._sourceNode);
  }
}
