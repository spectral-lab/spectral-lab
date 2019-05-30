import pack from 'ndarray-pack';
import normalize from 'ndarray-normalize';
import unpack from 'ndarray-unpack';
/**
 * @param  {Array.<Array.<number>>} array2d Array of array
 * @return {Array.<Array.<number>>} normalized 2D Array
 */
const normalize2d = (array2d) => {
  const ndarray = pack(array2d);
  const normalized = normalize(ndarray);
  return unpack(normalized);
};

export default normalize2d;
