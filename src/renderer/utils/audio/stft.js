// @flow
import '../../../types';
import { FFT, WindowFunction } from 'dsp.js-browser';
import packIntoNdarray from 'ndarray-pack';
import unpackFromNdArray from 'ndarray-unpack';
import { initWin, collectCenterFreqs } from './audioUtils';
import type { Frequency, Magnitude, SamplingRate } from '../../../types';
import type { Sec } from '../helpers/timeUtils';

type spectrogram = {
  times: Sec[],
  freqs: Frequency[],
  magnitude2d: Magnitude[][]
};
/**
 * Short Time Fourier Transform
 * @param audioBuffer
 * @param sr
 * @return {Promise<R>}
 */
const stft = (audioBuffer: AudioBuffer, sr: SamplingRate): Promise<spectrogram> => new Promise(resolve => {
  const originalFloatArray = audioBuffer.getChannelData(0);
  const win = initWin(1024, originalFloatArray);
  const windowFunction = new WindowFunction(7); // "7" corresponds to HANN window
  const fft = new FFT(win.size, sr);
  const freqs = collectCenterFreqs(win.size, fft);
  /** @type {number[][]} Array of spectrum (magnitude values from low freq bin to high freq bin) */
  const spectra = [];
  const times = [];
  for (let i = 0; win.getRightEdgeSampleIdx(i) < originalFloatArray.length; i++) {
    // Run windowing
    const slicedBuffer = originalFloatArray.slice(win.getLeftEdgeSampleIdx(i), win.getRightEdgeSampleIdx(i) + 1);
    times.push(win.getCenterSampleIdx(i) / sr);
    const windowedBuffer = windowFunction.process(slicedBuffer);
    // Run FFT
    fft.forward(windowedBuffer);
    // @ts-ignore
    win.spectrum = fft.spectrum;
    spectra.push(Array.from(win.spectrum));
  }
  const magnitude2d = unpackFromNdArray(packIntoNdarray(spectra).transpose(1, 0));

  resolve({ times, freqs, magnitude2d });
});

export default stft;
