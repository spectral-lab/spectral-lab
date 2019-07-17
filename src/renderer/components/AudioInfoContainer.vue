<template>
    <div>
        <audio-info
                :filepath="filepath"
                :basename="basename"
                :isPlaying="isPlaying"
                @click-play="handleClickPlay"
                @file-update="handleFileUpdate"
                @click-build="handleClickBuild"
        />
    </div>
</template>

<script>
import AudioInfo from './AudioInfo';
import { AudioBuffer, Spectrogram, MidiClip } from '../store/models';
import { playAudioBuffer } from '../modules/helpers';
import processAudioFile from '../modules/helpers/processAudioFile';
import uid from 'uid';
import { basename } from 'path';
import resample from '../modules/audio/resample';
import stft from '../modules/audio/stft';

export default {
  data () {
    return {
      sourceNode: null
    };
  },
  computed: {
    audioBuffer () {
      return AudioBuffer.query().last();
    },
    buffer () {
      if (!this.audioBuffer) return null;
      return this.audioBuffer.buffer;
    },
    filepath () {
      if (!this.audioBuffer) return '';
      return this.audioBuffer.originalFilePath;
    },
    basename () {
      return basename(this.filepath);
    },
    isPlaying () {
      return Boolean(this.sourceNode);
    },
    clipId () {
      return MidiClip.query().last().id;
    }
  },
  methods: {
    handleClickPlay () {
      if (this.sourceNode != null) {
        this.sourceNode.stop();
        this.sourceNode = null;
        return;
      }
      const ab = this.buffer;
      const ctx = this.$store.state.audioCtx;
      this.sourceNode = playAudioBuffer(ab, ctx);
      this.sourceNode.onended = () => {
        if (this.sourceNode != null) {
          this.sourceNode = null;
        }
      };
    },
    async handleFileUpdate (file) {
      if (!file) return;
      const ctx = this.$store.state.audioCtx;
      const { buffer, filepath } = await processAudioFile(file, ctx);
      AudioBuffer.insert({
        data: {
          id: uid(),
          buffer,
          originalFilePath: filepath
        }
      });
    },
    handleClickBuild () {
      this.buildSpectrogram();
    },
    async buildSpectrogram () {
      if (!this.buffer) return;
      const DESIRED_SAMPLE_RATE = 22050;
      const resampleEvent = await resample(this.buffer, DESIRED_SAMPLE_RATE);
      const resampledAudioBuffer = resampleEvent.renderedBuffer;
      const { times, freqs, magnitude2d } = await stft(resampledAudioBuffer, DESIRED_SAMPLE_RATE);
      Spectrogram.insert({
        data: {
          id: uid(),
          clipId: this.clipId,
          times,
          freqs,
          magnitude2d
        }
      });
    }
  },
  components: {
    AudioInfo
  }
};
</script>

<style scoped>

</style>
