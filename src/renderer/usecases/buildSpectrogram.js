// @flow
import { AudioBuffer, Spectrogram } from '../models';
import resample from '../utils/audio/resample';
import stft from '../utils/audio/stft';
import uid from 'uid';
import { timeConverter } from '../modules/container';

export const buildSpectrogram = async (audioBuffer: AudioBuffer) => {
  const buffer = audioBuffer.data;
  const audioBufferId = audioBuffer.id;
  const DESIRED_SAMPLE_RATE = 22050;
  const resampleEvent = await resample(buffer, DESIRED_SAMPLE_RATE);
  const resampledBuffer = resampleEvent.renderedBuffer;
  const { times, freqs, magnitude2d } = await stft(resampledBuffer, DESIRED_SAMPLE_RATE);
  await Spectrogram.insert({
    data: {
      id: uid(),
      audioBufferId,
      times: times.map(time => timeConverter.toTick(time * 1000)),
      freqs,
      magnitude2d
    }
  });
};
