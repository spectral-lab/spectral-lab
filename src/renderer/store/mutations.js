import { SET_AUDIO_BUFFER, SET_SPECTROGRAM, SWITCH_PAGE } from '../constants/mutation-types'

export default {
  [SET_AUDIO_BUFFER] (state, { audioBuffer, fileName }) {
    state.sourceAudioBuffer = audioBuffer
    state.fileName = fileName
  },
  [SET_SPECTROGRAM] (state, { spectrogram }) {
    state.spectrogram = spectrogram
  },
  [SWITCH_PAGE] (state, { page }) {
    state.page = page
  }
}
