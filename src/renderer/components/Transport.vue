<template>
  <div class="transport">
    <v-btn
      flat
      icon
    >
      <v-icon
        :color="playButtonColor"
        @click="playNotes"
        size="28px"
      >
        play_arrow
      </v-icon>
    </v-btn>
    <v-btn
      @click="testTone"
      flat
      icon
    >
      test
    </v-btn>
    <v-btn
      flat
      icon
    >
      <v-icon
        @click="allNotesOff"
        size="28px"
      >
        stop
      </v-icon>
    </v-btn>
    <v-btn
      flat
      icon
    >
      <v-icon size="24px">
        fiber_manual_record
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import OutputManager from '../modules/outputManager';
import { Clip, Song } from '../store/models';
import { range } from 'lodash';
import { noteOffMessage } from '../modules/midi/formatMidiMessage';
import { transportHeight } from '../../constants/layout';
import Vue from 'vue';
import { processClip } from '../modules/outputManager/utils';

export default Vue.extend({
  data: function () {
    return {
      isPlaying: false,
      midiOutput: null,
      transportHeight
    };
  },
  computed: {
    playButtonColor () {
      return this.isPlaying ? 'success' : 'white';
    },
    song () {
      return Song.query().first();
    },
    bpm () {
      return this.song.bpm;
    },
    ticksPerBeat () {
      return this.song.ticksPerBeat;
    }
  },
  mounted () {
    navigator.requestMIDIAccess().then(access => {
      const ids = [];
      access.outputs.forEach(output => ids.push(output.id));
      this.midiOutput = access.outputs.get(ids[0]);
      this.outputManager = new OutputManager({
        send: (message, timestamp) =>
          this.midiOutput.send(message, window.performance.now() + this.tickToMs(timestamp))
      });
    });
  },
  methods: {
    testTone () {
      // Note on, middle C, full velocity
      // Then, release velocity = 64, timestamp = now + 1000ms.
      const noteOnMessage = [0x91, 69, 0x7f];
      this.midiOutput.send(noteOnMessage);
      this.midiOutput.send([0x81, 69, 0x40], window.performance.now() + 1000.0);
    },
    playNotes () {
      const clip = Clip.query().where('selected', true).withAllRecursive().last();
      processClip(clip, this.outputManager);
    },
    allNotesOff () {
      range(1, 17).forEach(channel => {
        range(128).forEach(noteNumber => {
          this.midiOutput.send(noteOffMessage(noteNumber, 0, channel));
        });
      });
    },
    tickToMs (tick) {
      return tick / this.ticksPerBeat / this.bpm * 60 * 1e3;
    }
  }
});
</script>

<style scoped>
  .transport {
    height: 100%;
    background: #212121;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
