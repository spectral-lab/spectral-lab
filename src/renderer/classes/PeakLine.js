import { normalizeMagnitude } from '../utils/helpers';

/** Class representing a line which contains points detected as peak. */
class PeakLine {
  /**
   * @param {Array.<Array.<number>>} threePointedArray - Points in the Peak Line. Each point is a pair of [timeIdx, freqIdx, magnitude]
   * @param {number} id - id.
   */
  constructor (threePointedArray, spectrogram, id) {
    const firstPoint = threePointedArray[0];
    const lastPoint = threePointedArray[threePointedArray.length - 1];
    this.id = id;
    this.startTimeIdx = firstPoint[0];
    this.endTimeIdx = lastPoint[0];
    /** @member {Array.<{row: number, column: number, magnitude: number}>} points Each point is a pair of [row, column] */
    this.points = threePointedArray.map(timeAndFreqAndMag => {
      const roundedRow = Math.round(timeAndFreqAndMag[1]);
      const roundedColumn = Math.round(timeAndFreqAndMag[0]);
      return {
        // TODO: Implement frequency interpolation. freqIdx will come as float number.
        position: {
          row: timeAndFreqAndMag[1],
          column: timeAndFreqAndMag[0]
        },
        time: spectrogram.times[roundedColumn],
        magnitude: normalizeMagnitude(timeAndFreqAndMag[2]),
        frequency: spectrogram.freqs[roundedRow]
      };
    });
    this.numberOfPoints = threePointedArray.length;
  }
}

export default PeakLine;
