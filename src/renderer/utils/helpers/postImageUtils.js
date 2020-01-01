// @flow
import { PNG } from 'pngjs';
import { decibelCurve } from '.';
import { flatten } from 'lodash';
import type { Degree, Sensitivity } from '../../../types';

export const postImage = (buff: Buffer, params: {sensitivity: Sensitivity, degree: Degree}): Promise<number[][]> => new Promise((resolve, reject) => {
  const blob = new Blob([buff], { type: 'images/png' });
  const formData = new FormData();
  formData.append('pngImage', blob);
  formData.append('sensitivity', String(params.sensitivity));
  formData.append('degree', String(params.degree));

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
export const makePNGBuffer = (imgAs2dArray: number[][]) => {
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
