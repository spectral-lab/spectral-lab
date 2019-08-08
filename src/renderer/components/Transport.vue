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
import { Clip } from '../store/models';
import { transportHeight } from '../../constants/layout';
import Vue from 'vue';
import { allNotesOff } from '../modules/helpers/allNotesOff';
import { MidiPlayer } from '../modules/helpers/MidiPlayer';
import { timeConverter } from '../modules/helpers/timeUtils';

export default Vue.extend({
  data: function () {
    return {
      isPlaying: false,
      midiOutput: null,
      midiPlayer: null,
      transportHeight
    };
  },
  computed: {
    playButtonColor () {
      return this.isPlaying ? 'success' : 'white';
    }
  },
  mounted () {
    navigator.requestMIDIAccess().then(access => {
      const ids = [];
      access.outputs.forEach(output => ids.push(output.id));
      this.midiOutput = access.outputs.get(ids[0]);
      this.midiPlayer = new MidiPlayer({
        send: (message, timestamp) => {
          if (!timestamp) return this.midiOutput.send(message);
          this.midiOutput.send(message, window.performance.now() + timeConverter.toMs(timestamp));
        }
      });
    });
  },
  methods: {
    playNotes () {
      const clip = Clip.query().where('selected', true).withAllRecursive().last();
      this.midiPlayer.play(clip);
    },
    testTone () {
      this.midiPlayer.testTone();
    },
    allNotesOff () {
      allNotesOff(message => this.midiOutput.send(message));
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
