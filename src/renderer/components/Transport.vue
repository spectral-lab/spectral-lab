<template>
  <div class="transport">
    <v-btn
      flat
      icon
    >
      <v-icon
        size="28px"
        :color="playButtonColor"
        @click="playNotes"
      >
        play_arrow
      </v-icon>
    </v-btn>
    <v-btn
      flat
      icon
      @click="testTone"
    >
      test
    </v-btn>
    <v-btn
      flat
      icon
    >
      <v-icon
        size="28px"
        @click="allNotesOff"
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
import { Note, Song } from '../store/models';
import { range } from 'lodash';
import { noteOffMessage } from '../modules/midi/formatMidiMessage';
import { transportHeight } from '../constants/layout';

export default {
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
      this.outputManager = new OutputManager({ midiOutput: this.midiOutput });
    });
  },
  methods: {
    testTone () {
      const noteOnMessage = [0x91, 69, 0x7f]; // note on, middle C, full velocity
      this.midiOutput.send(noteOnMessage); // omitting the timestamp means send immediately.
      this.midiOutput.send([0x81, 69, 0x40], window.performance.now() + 1000.0); // Inlined array creation- note off, middle C,
      // release velocity = 64, timestamp = now + 1000ms.
    },
    playNotes () {
      const notes = Note.query().withAllRecursive().get();
      notes.forEach((note) => {
        const { noteOn, modulations, noteOff } = note;
        const noteControl = this.outputManager.noteOn(noteOn, window.performance.now() + this.tickToMs(noteOn.absoluteTime));
        modulations.forEach(modulation => {
          noteControl.modulate(modulation, window.performance.now() + this.tickToMs(modulation.absoluteTime));
        });
        noteControl.noteOff(noteOff, window.performance.now() + this.tickToMs(noteOff.absoluteTime));
      });
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
};
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
