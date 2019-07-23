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
import { AudioBuffer, Spectrogram, Clip } from '../store/models';
import { playAudioBuffer } from '../modules/helpers';
import processAudioFile from '../modules/helpers/processAudioFile';
import uid from 'uid';
import { basename } from 'path';
import resample from '../modules/audio/resample';
import stft from '../modules/audio/stft';
import { secToTick } from '../modules/helpers/timeUtils';

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
    clip () {
      return Clip.query().last();
    },
    clipId () {
      return this.clip.id;
    },
    song () {
      return this.clip.parent.parent;
    }
  },
  methods: {
    handleClickPlay () {
      if (!this.audioBuffer) return;
      if (this.sourceNode != null) {
        this.sourceNode.stop();
        this.sourceNode = null;
        return;
      }
      const ab = this.audioBuffer.data;
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
          clipId: this.clipId,
          data: buffer,
          originalFilePath: filepath
        }
      });
    },
    handleClickBuild () {
      this.buildSpectrogram();
    },
    async buildSpectrogram () {
      if (!this.audioBuffer) return;
      const buffer = this.audioBuffer.data;
      const audioBufferId = this.audioBuffer.id;
      const DESIRED_SAMPLE_RATE = 22050;
      const resampleEvent = await resample(buffer, DESIRED_SAMPLE_RATE);
      const resampledBuffer = resampleEvent.renderedBuffer;
      const { times, freqs, magnitude2d } = await stft(resampledBuffer, DESIRED_SAMPLE_RATE);
      Spectrogram.insert({
        data: {
          id: uid(),
          audioBufferId,
          times: times.map(time => secToTick(time, this.song.bpm, this.song.ticksPerBeat)),
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
