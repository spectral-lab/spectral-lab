<template>
  <v-layout row>
    <v-toolbar color="grey darken-3" height=160>
        <v-layout column>
          <v-layout row class="mb-3">
            <v-spacer />
              Spectrogram
            <v-spacer />
          </v-layout>
          <v-layout row>
            <icon-btn-with-tip @click="buildSpectrogram" icon="build" tip="Build a spectrogram of the source audio." />
            <v-btn fab large color="primary" class="elevation-0">
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </v-layout>
        </v-layout>
    </v-toolbar>
    <v-toolbar color="grey darken-3" height=160>
      <v-layout column>
        <v-layout row class="mb-3">
          <v-spacer />
            Midi
          <v-spacer />
        </v-layout>
        <v-layout raw>
          <v-btn fab large color="primary" class="elevation-0">
            <v-icon>build</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-toolbar>
  </v-layout>
</template>

<script>
import IconBtnWithTip from './IconBtnWithTip';
import { stft, resample } from '../utils/audio';
import { SET_SPECTROGRAM } from '../constants/mutation-types';

export default {
  components: {
    IconBtnWithTip
  },
  methods: {
    async buildSpectrogram () {
      const audioBuffer = this.$store.state.sourceAudio.buffer;
      const DESIRED_SAMPLE_RATE = 22050;
      const resampleEvent = await resample(audioBuffer, DESIRED_SAMPLE_RATE);
      const resampledAudioBuffer = resampleEvent.renderedBuffer;
      const spectrogram = await stft(resampledAudioBuffer, DESIRED_SAMPLE_RATE);
      this.$store.commit({
        type: SET_SPECTROGRAM,
        spectrogram
      });
    }
  }
};
</script>
