import { PNG } from 'pngjs'
import { decibelCurve } from '.'
/**
 * @param  {Array.<Array.<number>>} imgAs2dArray Each element is in range from 0. to 1
 */
const makePNGBuffer = (imgAs2dArray) => {
  const png = new PNG({
    width: imgAs2dArray[0].length,
    height: imgAs2dArray.length,
    bitDepth: 8,
    colorType: 0,
    inputHasAlpha: false
  })
  // @ts-ignore
  png.data = imgAs2dArray.flat().map(magnitude => {
    const ret = Math.round(decibelCurve(magnitude) * 255)
    return [ret, ret, ret, 255] // [R, G, B, A]
  }).flat()
  return PNG.sync.write(png, {
    colorType: 0
  })
}

export default makePNGBuffer
