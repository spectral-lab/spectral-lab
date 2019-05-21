<template>
  <div class="open-button">
    <div id="dropArea" @drop="handleDrop" @dragover="handleDragOver">Drop An Audio File Here</div>
  </div>
</template>

<script>
import { sumToMono, normalize, crop } from '../utils/audio'
import loadFileAsArrayBuffer from '../utils/helpers/loadFileAsArrayBuffer'

export default {
  methods: {
    handleDragOver (e) {
      e.preventDefault()
    },
    handleDrop: async function (e) {
      e.preventDefault()
      const f = e.dataTransfer.files[0]
      const context = new AudioContext({latencyHint: 'interactive', sampleRate: 22050})
      const DESIRED_DURATION = 10 // in seconds.
      const loadEvent = await loadFileAsArrayBuffer(f)
      const originalAudioBuffer = await context.decodeAudioData(loadEvent.target.result)
      const monoAudioBuffer = sumToMono(originalAudioBuffer)
      const croppedAudioBuffer = crop(monoAudioBuffer, DESIRED_DURATION)
      const normalizedAudioBuffer = normalize(croppedAudioBuffer)
      this.$store.dispatch({
        type: 'acceptAudio',
        payload: {
          audioBuffer: normalizedAudioBuffer,
          fileName: f.name
        }
      })
    }
  }
}
</script>

<style scoped>
    canvas {
      background-color: #13161A;
    }
    #dropArea {
      margin: 10vh auto;
      width: 80vw;
      height: 80vh;
      line-height: 80vh;
      border: 2px dashed white;
      font-size: 3rem;
      cursor: pointer;
    }
</style>