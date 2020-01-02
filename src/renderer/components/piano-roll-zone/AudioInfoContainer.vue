<template>
  <div>
    <audio-info
      :filepath="filepath"
      :basename="basename"
      :is-playing="isPlaying"
      @click-play="handleClickPlay"
      @file-update="handleFileUpdate"
    />
  </div>
</template>

<script>
import AudioInfo from './AudioInfo';
import { AudioBuffer, Clip } from '../../models';
import processAudioFile from '../../utils/helpers/processAudioFile';
import uid from 'uid';
import { basename } from 'path';
import { audioPlayer } from '../../modules/container';
import { audioCtx as ctx } from '../../utils/audio/audioCtx';
import Vue from 'vue';
import { buildSpectrogram } from '../../usecases/buildSpectrogram';

export default Vue.extend({
  components: {
    AudioInfo
  },
  data () {
    return {
      isPlaying: false
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
    clip () {
      return Clip.query().last();
    },
    clipId () {
      return this.clip.id;
    }
  },
  mounted () {
    audioPlayer.onStop = () => { this.isPlaying = false; };
    audioPlayer.onStart = () => { this.isPlaying = true; };
  },
  methods: {
    handleClickPlay () {
      if (audioPlayer.isPlaying) return audioPlayer.stop();
      audioPlayer.play();
    },
    async handleFileUpdate (file) {
      if (!file) return;
      const { buffer, filepath } = await processAudioFile(file, ctx);
      audioPlayer.buffer = buffer;
      await AudioBuffer.insert({
        data: {
          id: uid(),
          clipId: this.clipId,
          data: buffer,
          originalFilePath: filepath
        }
      });
      await this.buildSpectrogram();
    },
    async buildSpectrogram () {
      if (!this.audioBuffer) return;
      await buildSpectrogram(this.audioBuffer);
    }
  }
});
</script>

<style scoped>

</style>
