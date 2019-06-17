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
              <icon-btn-with-tip @click="extractNotes" icon="fa-flask" tip="Extract notes from spectrogram" />
            </v-flex>
            <v-flex>
              <icon-btn-with-tip icon="delete" tip="Delete note (under construction)" />
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
import { makePNGBuffer, ftom } from '../utils/helpers';
import { CREATE_NOTE, MODULATE_NOTE } from '../store/action-types';

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
    },
    extractNotes () {
      const sensitivity = 5;
      const degree = 6;
      const { spectrogram } = this.$store.state;
      if (spectrogram.times.length === 0) return;
      // // Make formData to post
      const buff = makePNGBuffer(spectrogram.magnitude2d);
      const blob = new Blob([buff], { type: 'images/png' });
      const formData = new FormData();
      formData.append('pngImage', blob);
      formData.append('sensitivity', sensitivity);
      formData.append('degree', degree);

      // Post
      fetch('http://localhost:6220', {
        method: 'POST',
        body: formData,
        mode: 'cors'
      })
        .then(d => d.json())
        .then(extractedLines => {
          extractedLines.forEach(async (line) => {
            const noteOnPoint = line[0];
            const materials = this.parseNoteOnPoint(noteOnPoint, spectrogram);
            const noteId = await this.$store.dispatch(CREATE_NOTE, materials);
            const modulationLine = line.slice(1);
            modulationLine.forEach(point => {
              const modulation = this.parseModulationPoint(point, spectrogram);
              this.$store.dispatch(MODULATE_NOTE, { modulation, id: noteId });
            });
          });
        })
        .catch((console.error));
    },
    parseNoteOnPoint (noteOnPoint, spectrogram) {
      const timeIdx = noteOnPoint[0]; // float
      const timeInterval = spectrogram.times[1] - spectrogram.times[0];
      const time = spectrogram.times[Math.floor(timeIdx)] + timeInterval * (timeIdx - Math.floor(timeIdx));
      const freqIdx = noteOnPoint[1]; // float
      const freqInterval = spectrogram.freqs[1] - spectrogram.freqs[0];
      const freq = spectrogram.freqs[Math.floor(freqIdx)] + freqInterval * (freqIdx - Math.floor(freqIdx));
      const pitch = ftom(freq);
      const noteOnVelocity = noteOnPoint[2];
      const pressure = noteOnPoint[2];
      return { time, pitch, noteOnVelocity, pressure };
    },
    parseModulationPoint (modulationPoint, spectrogram) {
      const timeIdx = modulationPoint[0]; // float
      const timeInterval = spectrogram.times[1] - spectrogram.times[0];
      const time = spectrogram.times[Math.floor(timeIdx)] + timeInterval * (timeIdx - Math.floor(timeIdx));
      const freqIdx = modulationPoint[1]; // float
      const freqInterval = spectrogram.freqs[1] - spectrogram.freqs[0];
      const freq = spectrogram.freqs[Math.floor(freqIdx)] + freqInterval * (freqIdx - Math.floor(freqIdx));
      const pitch = ftom(freq);
      const pressure = modulationPoint[2];
      return { time, pitch, pressure };
    }
  }
};
</script>


