<template>
  <div id="container">
    <Messages v-bind="{onClick: handleClick}" :text="currentMessage" :buttonActive="showButton" :buttonText="buttonText"/>
    <Modal v-if="showModal" v-bind="{closeModal}" />
    <div id="viewerWrapper">
      <div id="viewerArea">
        <div class="viewer-child-container spectrogram" :style="spectrogram">
          <canvas id="spectrogram" ref="spectrogram" width="1920" height="1080" />
        </div>
        <div id="peakLinesContainer" class="viewer-child-container spectrogram" :style="spectrogram">
          <canvas id="peakLines" ref="peakLines" width="1920" height="1080" />
        </div>
        <div class="viewer-child-container waveform" :style="waveform">
          <canvas id="waveform" ref="waveform" width="1920" height="1080" />
        </div>
      </div>
      <div id="sliderContainer">
        <slider v-model="viewerOpacity" />
      </div>
    </div>
    <Utilities />
  </div>
</template>

<script>
import Slider from '../components/Slider.vue'
import Messages from '../components/Messages.vue'
import Utilities from '../components/Utilities.vue'
import Modal from '../components/Modal.vue'
import { resample } from '../utils/audio'
import { PeakLine } from '../classes' // eslint-disable-line no-unused-vars
import { renderWaveform, renderSpectrogram, renderPeakLines } from '../utils/plot'
import { SET_SPECTROGRAM } from '../constants/mutation-types'
import { RENDER_PEAK_LINES } from '../constants/events'

const fadedOpacity = value => value >= 0.5 ? 1.0 : value * 2.0
const MESSAGES = {
  LOADING: 'Now, building your spectrogram. Just a moment.',
  SPECTROGRAM_BUILT: 'Here is the Spectrogram. Check and click next.',
  COMPLETE: 'You have done! Now you can play Starling on Ableton Live'
}
const NEXT_BUTTON_TEXT = 'Next →'
const EXTRACT_BUTTON_TEXT = 'Extract Again'

export default {
  data () {
    return {
      viewerOpacity: 50,
      showModal: false,
      messageKey: 'LOADING',
      showButton: false,
      buttonText: NEXT_BUTTON_TEXT
    }
  },
  computed: {
    waveform () {
      const value = Number(this.viewerOpacity) / 100
      return {
        opacity: fadedOpacity(value)
      }
    },
    spectrogram () {
      const value = Math.abs(1.0 - (Number(this.viewerOpacity) / 100))
      return {
        opacity: fadedOpacity(value)
      }
    },
    currentMessage () {
      return MESSAGES[this.messageKey]
    }
  },
  mounted () {
    this.plotWaveformAndSpectrogram()
    this.$eventHub.$on(RENDER_PEAK_LINES, this.plotPeakLines)
  },
  beforeDestroy () {
    this.$eventHub.$off(RENDER_PEAK_LINES)
  },
  methods: {
    handleClick () {
      switch (this.$data.messageKey) {
        case 'LOADING':
          break
        case 'COMPLETE':
        case 'SPECTROGRAM_BUILT':
          this.openModal()
          break
        default:
          break
      }
    },
    openModal () {
      this.$data.showModal = true
    },
    closeModal () {
      this.$data.showModal = false
      this.$data.messageKey = 'COMPLETE'
      this.$data.buttonText = EXTRACT_BUTTON_TEXT
    },
    async plotWaveformAndSpectrogram () {
      const audioBuffer = this.$store.state.sourceAudioBuffer
      const DESIRED_SAMPLE_RATE = 22050
      const windowSize = 1024
      const resampleEvent = await resample(audioBuffer, DESIRED_SAMPLE_RATE)
      const resampledAudioBuffer = resampleEvent.renderedBuffer
      renderWaveform(resampledAudioBuffer, this.$refs.waveform)
      const spectrogram = await renderSpectrogram(
        resampledAudioBuffer,
        this.$refs.spectrogram,
        windowSize,
        DESIRED_SAMPLE_RATE
      )
      this.$store.commit({
        type: SET_SPECTROGRAM,
        spectrogram
      })
      this.$data.messageKey = 'SPECTROGRAM_BUILT'
      this.$data.showButton = true
    },
    /** @param {Array.<PeakLine>} peakLines */
    plotPeakLines (peakLines) {
      renderPeakLines(peakLines, this.$store.state.spectrogram, this.$refs.peakLines)
    }
  },
  components: {
    Modal,
    Slider,
    Messages,
    Utilities
  }
}
</script>

<style scoped>
  #container {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    position: fixed;
  }
  #viewerWrapper {
    position: relative;
    width: 100%;
    height: 520px;
    background: rgba(91, 104, 129, 0.5);
    /* background: linear-gradient(90deg, rgba(85, 164, 179, 0.4) 0%, rgba(85, 164, 179, 0.7) 50%, rgba(85, 164, 179, 0.4) 100%); */
    /* opacity: 0.8; */
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  #viewerArea {
    position: relative;
    width: 90vw;
    height: 420px;
    background: rgb(30, 30, 36);
  }
  @keyframes blinker {
    0%   { opacity: 1; }
    40%  { opacity: 1; }
    70%  { opacity: 0; }
    100% { opacity: 1; }
  }
  #peakLines {
    animation: blinker 2.8s infinite;
  }
 .viewer-child-container {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   /* margin: 0 auto; */
 }
 .viewer-child-container canvas {
   width: 100%;
   height: 100%;
 }
</style>