import { FFT, WindowFunction } from 'dsp.js-browser'
import packIntoNdarray from 'ndarray-pack'
import unpackFromNdArray from 'ndarray-unpack'
import { calcYPos, decibelCurve } from '../helpers'

/**
 * Calculate STFT, Short Time Fourier Transform, on audio buffer and plot a spectrogram on canvas element.
 * @param  {AudioBuffer} audioBuffer
 * @param  {HTMLCanvasElement} canvas
 * @param  {number} _windowSize In number of samples. This will be replaced with the nearest power of 2
 * @param  {number} sr Sampling rate of audio buffer. Integer
 * @return {Promise.<{times: Array.<number>, freqs: Array.<number>, magnitude2d: Array.<Array<number>>}>} freqs is decimal values in Hz. From low to high. magnitude2d is decimals from 0. to 1. From low freq to high freq.
 */
const spectrogram = (audioBuffer, canvas, _windowSize, sr) => new Promise(resolve => {
  // Initialize and calculate necessary informations for subsequenct runFFTAndPlot
  const originalFloatArray = audioBuffer.getChannelData(0)
  const win = initWin(_windowSize, originalFloatArray)
  const windowFunction = new WindowFunction(7) // "7" corresponds to HANN window
  const fft = new FFT(win.size, sr)
  const freqs = getCenterFreqs(win.size, fft)
  const resultOfSTFT = initResultOfSTFT()
  resultOfSTFT.freqs = freqs

  // Main
  const runFFTAndPlot = () => {
    let i = 0
    /** @type {Array.<Array>} Array of spectrum (magnitude values from low freq bin to high freq bin) */
    const spectra = []

    /** Recursive function */
    const plotColumn = () => {
      // Run windowing
      const slicedBuffer = originalFloatArray.slice(win.getLeftEdgeSampleIdx(i), win.getRightEdgeSampleIdx(i) + 1)
      resultOfSTFT.times.push(win.getCenterSampleIdx(i) / sr)
      const windowedBuffer = windowFunction.process(slicedBuffer)
      // Run FFT
      fft.forward(windowedBuffer)
      // @ts-ignore
      win.spectrum = fft.spectrum
      spectra.push(Array.from(win.spectrum))
      win.spectrum.forEach(plotRect)

      // Increment and resursion
      i++
      if (win.getRightEdgeSampleIdx(i) < originalFloatArray.length) {
        window.requestAnimationFrame(plotColumn)
      } else {
        resultOfSTFT.magnitude2d = unpackFromNdArray(packIntoNdarray(spectra).transpose(1, 0))
        resolve(resultOfSTFT)
      }
    }

    /** Subfunction of plotColumn */
    const plotRect = (magnitude, rowIdx) => {
      /** @type {number} How many samples is in the original buffer  */
      const numberOfSamples = originalFloatArray.length
      const numberOfRows = win.spectrum.length
      const rect = {
        center: {
          x: canvas.width * win.getCenterSampleIdx(i) / numberOfSamples,
          y: calcYPos(freqs[rowIdx], freqs, canvas.height)
        },
        isLowestRect: rowIdx === 0,
        isUpmostRect: rowIdx === numberOfRows.length - 1,
        luminance: decibelCurve(magnitude)
      }
      const oneLowerRectCenterY = rect.isLowestRect ? canvas.height : calcYPos(freqs[rowIdx - 1], freqs, canvas.height)
      const oneUpperRectCenterY = rect.isUpmostRect ? 0 : calcYPos(freqs[rowIdx + 1], freqs, canvas.height)
      rect.lowerEdge = {
        y: (oneLowerRectCenterY + rect.center.y) / 2
      }
      rect.upperEdge = {
        y: (oneUpperRectCenterY + rect.center.y) / 2
      }
      rect.width = canvas.width * win.size / numberOfSamples
      rect.height = rect.lowerEdge.y - rect.upperEdge.y
      const HUE = 200
      const ctx = canvas.getContext('2d')
      ctx.globalAlpha = rect.luminance
      ctx.fillStyle = `hsl(${HUE},100%,${rect.luminance * 100}%)`

      ctx.fillRect(
        rect.center.x - rect.width / 2,
        rect.upperEdge.y,
        rect.width,
        rect.height
      )
    }
    window.requestAnimationFrame(plotColumn)
  }

  runFFTAndPlot()
})

export default spectrogram

// Subfunctions

/** initialize `win` object, which represents window of STFT. */
const initWin = (_windowSize, originalFloatArray) => {
  const win = {}
  win.size = normalizeWindowSize(_windowSize, originalFloatArray)
  const stepSize = win.size / 4
  win.getLeftEdgeSampleIdx = windowIdx => windowIdx * stepSize
  win.getRightEdgeSampleIdx = windowIdx => (win.size - 1) + windowIdx * stepSize
  win.getCenterSampleIdx = windowIdx => win.size / 2 + windowIdx * stepSize
  return win
}

const initResultOfSTFT = () => {
  return {
    times: [],
    freqs: [],
    magnitude2d: null
  }
}

/**
 * Window size must be power of 2. minimum value is 8.
 * @param  {number} windowSize
 * @param  {Float32Array} originalFloatArray
 */
const normalizeWindowSize = (windowSize, originalFloatArray) => {
  if (windowSize < 8) {
    return 8
  }
  if (windowSize > originalFloatArray.length) {
    return 2 ** Math.floor(Math.log2(originalFloatArray.length))
  }
  return 2 ** Math.round(Math.log2(windowSize))
}

/**
   * @param  {number} windowSize Integer
   * @param  { FFT } fft instance of FFT class of dsp.js
   * @return { Array.<Number> } An array of center frequencies of each frequency bin.
   */
const getCenterFreqs = (windowSize, fft) => {
  const numberOfFrequencyBins = windowSize / 2
  // @ts-ignore
  const freqs = Array.from({ length: numberOfFrequencyBins }, (_, i) => i).map(i => fft.getBandFrequency(i))
  return freqs
}
