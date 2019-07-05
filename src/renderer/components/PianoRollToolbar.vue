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
                <icon-btn-with-tip
                  @click="buildSpectrogram"
                  icon="build"
                  tip="Build a spectrogram of the source audio."
                />
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
              <icon-btn-with-tip
                @click="extractNotes"
                icon="fa-flask"
                tip="Extract notes from spectrogram"
              />
            </v-flex>
            <v-flex>
              <icon-btn-with-tip
                @click="deleteAllNotes"
                icon="delete_forever"
                tip="Delete note (under construction)"
              />
            </v-flex>
          </v-layout>
        </v-layout>
      </v-toolbar>
    </v-layout>
  </div>
</template>

<script>
import IconBtnWithTip from './IconBtnWithTip';
import { stft, resample } from '../modules/audio';
import { SET_SPECTROGRAM } from '../store/mutation-types';
import { CREATE_NOTE, MODULATE_NOTE, RELEASE_NOTE, DELETE_ALL_NOTES } from '../store/action-types';
import * as MOUSE_MODES from '../constants/mouse-modes';
import {
  makePNGBuffer, postImage,
  parsePointAsNoteOn, parsePointAsModulation, parsePointAsNoteOff
} from '../modules/helpers/postImageUtils';

export default {
  components: {
    IconBtnWithTip
  },
  computed: {
    bpm () {
      return this.$store.state.bpm;
    },
    tpb () {
      return this.$store.state.tpb;
    }
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
    async extractNotes () {
      const { spectrogram } = this.$store.state;
      if (spectrogram.times.length === 0) return;
      const buff = makePNGBuffer(spectrogram.magnitude2d);
      const extractedLines = await postImage(buff, { sensitivity: 5, degree: 6 });
      extractedLines.forEach(async (line) => {
        const noteId = await this.$store.dispatch(
          CREATE_NOTE,
          parsePointAsNoteOn(line[0], spectrogram, this.secToTick)
        );
        const modulationPoints = line.slice(1, -1);
        modulationPoints.forEach(point => {
          const modulation = parsePointAsModulation(point, spectrogram, this.secToTick);
          this.$store.dispatch(MODULATE_NOTE, { modulation, id: noteId });
        });
        this.$store.dispatch(RELEASE_NOTE, {
          noteOff: parsePointAsNoteOff(line[line.length - 1], spectrogram, this.secToTick),
          id: noteId
        });
      });
    },
    deleteAllNotes () {
      this.$store.dispatch(DELETE_ALL_NOTES);
    },
    secToTick (sec) {
      return sec / 60 * this.bpm * this.tpb;
    }
  }
};
</script>


