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
 * @property {NoteOff | null} noteOff
 * @property {Array.<Modulation>} modulations
 */

/**
 * @typedef NoteOn
 * @property {string} type
 * @property {number} time In tick
 * @property {number} noteNumber
 * @property {number} noteOnVelocity
 * @property {number} pitchBend
 * @property {number} pressure
 * @property {number} timbre
 */

/**
 * @typedef Modulation
 * @property {string} type
 * @property {number} offsetTime In tick default=0
 * @property {number} [pitchBend] In midi note number. Negative float is acceptable. default=0
 * @property {number} [pressure] from 0.0 to 1.0. default=0.5
 * @property {number} [timbre] from 0.0 to 1.0. default=0.5
 */

/**
 * @typedef NoteOff
 * @property {string} type
 * @property {number} offsetTime
 * @property {number} noteOffVelocity
 */

/**
 * @typedef {NoteOn | Modulation | NoteOff} NoteAction
 */

export type MidiMessage = [number, number] | [number, number, number];

/**
 * @param  message Array of midi message eg: [0x90, 63, 127]
 * @param  timestamp Unit is tick.
 */
export type Send = (message: number[], timestamp: number) => void;

/**
 * eg: performance.now
 * @return {number} timestamp Elapsed time from time origin. Unit is ms.
 */
export type Now = () => number;
