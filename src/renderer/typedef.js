/**
 * @typedef Spectrogram
 * @property {Array<Array<Number>>} magnitude2d
 * @property {Array<Number>} freqs
 * @property {Array<Number>} times
 */

/**
 * @typedef Modulation
 * @property {number} time In second default=0
 * @property {number} [pitch] In midi note number. Not only integer but float is acceptable. default=60
 * @property {number} [power] from 0.0 to 1.0. default=0.5
 * @property {number} [timbre] from 0.0 to 1.0. default=0.5
 */
