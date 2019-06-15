/**
 * @typedef Spectrogram
 * @property {Array<Array<Number>>} magnitude2d
 * @property {Array<Number>} freqs
 * @property {Array<Number>} times
 */

/**
 * @typedef Note
 * @property {number} id
 * @property {NoteOn} noteOn
 * @property {NoteOff} noteOff
 * @property {Array.<Modulation>} modulations
 */

/**
 * @typedef NoteOn
 * @property {number} time
 * @property {number} noteNumber
 * @property {number} noteOnVelocity
 * @property {number} pitchBend
 * @property {number} pressure
 * @property {number} timbre
 * @property {string} [type]
 */

/**
 * @typedef Modulation
 * @property {number} offsetTime In second default=0
 * @property {number} [pitchBend] In midi note number. Negative float is acceptable. default=0
 * @property {number} [pressure] from 0.0 to 1.0. default=0.5
 * @property {number} [timbre] from 0.0 to 1.0. default=0.5
 * @property {string} [type]
 */

/**
 * @typedef NoteOff
 * @property {number} offsetTime
 * @property {number} [noteOffVelocity]
 * @property {string} [type]
 */
