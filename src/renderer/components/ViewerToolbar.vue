<template>
  <div>
    <v-layout row>
      <v-toolbar color="grey darken-3" height=160>
          <v-layout column>
            <v-layout row class="mb-3">
              <v-spacer />
                Spectrogram
              <v-spacer />
            </v-layout>
            <v-layout row align-center>
              <v-flex>
                <icon-btn-with-tip @click="buildSpectrogram" icon="build" tip="Build a spectrogram of the source audio." />
              </v-flex>
              <v-flex>
                <v-btn fab color="primary" class="elevation-0">
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </v-flex>
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
          <v-layout row align-center>
            <v-flex>
              <v-btn-toggle @change="emitMouseMode" mandatory>
                <v-btn class="mouse-pointer">
                  <v-icon flat>fa-mouse-pointer</v-icon>
                </v-btn>
                <v-btn>
                  <v-icon flat>fa-pen</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-flex>
            <v-flex>
              <v-btn fab color="primary" class="elevation-0">
                <v-icon>fa-flask</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-toolbar>
    </v-layout>
  </div>
</template>

<script>
import IconBtnWithTip from './IconBtnWithTip';
import { stft, resample } from '../utils/audio';
import { SET_SPECTROGRAM } from '../store/mutation-types';
import * as MOUSE_MODES from '../constants/mouse-modes';

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
      this.$store.commit(SET_SPECTROGRAM, { spectrogram });
    },
    emitMouseMode (modeIdx) {
      switch (modeIdx) {
        case 0:
          this.$emit('mousemode', MOUSE_MODES.SELECT);
          break;
        case 1:
          this.$emit('mousemode', MOUSE_MODES.PEN);
          break;
      }
    }
  }
};
</script>


