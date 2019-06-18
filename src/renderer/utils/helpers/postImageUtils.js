import { PNG } from 'pngjs';
import { decibelCurve, ftom } from '.';
import { flatten } from 'lodash';

export const postImage = (buff, params) => new Promise((resolve, reject) => {
  const blob = new Blob([buff], { type: 'images/png' });
  const formData = new FormData();
  formData.append('pngImage', blob);
  formData.append('sensitivity', params.sensitivity);
  formData.append('degree', params.degree);

  // Post
  fetch('http://localhost:6220', {
    method: 'POST',
    body: formData,
    mode: 'cors'
  })
    .then(d => d.json())
    .then(resolve)
    .catch(err => { throw new Error(err); });
});

/**
 * @param  {Array.<Array.<number>>} imgAs2dArray Each element is in range from 0. to 1
 */
export const makePNGBuffer = (imgAs2dArray) => {
  const png = new PNG({
    width: imgAs2dArray[0].length,
    height: imgAs2dArray.length,
    bitDepth: 8,
    colorType: 0,
    inputHasAlpha: false
  });
  // @ts-ignore
  png.data = flatten(imgAs2dArray).reduce((acc, magnitude) => {
    const luminance = Math.round(decibelCurve(magnitude) * 255);
    acc.push(luminance, luminance, luminance, 255); // [R, G, B, A]
    return acc;
  }, []);
  return PNG.sync.write(png, {
    colorType: 0
  });
};

export const parsePointAsNoteOn = (noteOnPoint, spectrogram) => {
  const timeIdx = noteOnPoint[0]; // float
  const timeInterval = spectrogram.times[1] - spectrogram.times[0];
  const time = spectrogram.times[Math.floor(timeIdx)] + timeInterval * (timeIdx - Math.floor(timeIdx));
  const freqIdx = noteOnPoint[1]; // float
  const freqInterval = spectrogram.freqs[1] - spectrogram.freqs[0];
  const freq = spectrogram.freqs[Math.floor(freqIdx)] + freqInterval * (freqIdx - Math.floor(freqIdx));
  const pitch = ftom(freq);
  const noteOnVelocity = noteOnPoint[2];
  const pressure = noteOnPoint[2];
  return { time, pitch, noteOnVelocity, pressure };
};

export const parsePointAsModulation = (modulationPoint, spectrogram) => {
  const timeIdx = modulationPoint[0]; // float
  const timeInterval = spectrogram.times[1] - spectrogram.times[0];
  const time = spectrogram.times[Math.floor(timeIdx)] + timeInterval * (timeIdx - Math.floor(timeIdx));
  const freqIdx = modulationPoint[1]; // float
  const freqInterval = spectrogram.freqs[1] - spectrogram.freqs[0];
  const freq = spectrogram.freqs[Math.floor(freqIdx)] + freqInterval * (freqIdx - Math.floor(freqIdx));
  const pitch = ftom(freq);
  const pressure = modulationPoint[2];
  return { time, pitch, pressure };
};