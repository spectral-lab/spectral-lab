<template>
  <v-footer app fixed>
    <v-spacer />
    <v-btn flat icon>
      <v-icon size="28px" :color="playButtonColor" @click="playNotes">play_arrow</v-icon>
    </v-btn>
    <v-btn flat icon @click="testTone">
      test
    </v-btn>
    <v-btn flat icon>
      <v-icon size="28px">stop</v-icon>
    </v-btn>
    <v-btn flat icon>
      <v-icon size="24px">fiber_manual_record</v-icon>
    </v-btn>
    <v-spacer />
  </v-footer>
</template>

<script>
import OutputManager from '../modules/outputManager';
import * as defaults from '../constants/defaults';

export default {
  data: function () {
    return {
      isPlaying: false,
      midiOutput: null
    };
  },
  computed: {
    playButtonColor () {
      return this.isPlaying ? 'success' : 'white';
    },
    bpm () {
      return this.$store.state.bpm;
    },
    tpb () {
      return this.$store.state.tpb;
    }
  },
  mounted () {
    navigator.requestMIDIAccess().then(access => {
      const ids = [];
      access.outputs.forEach(output => ids.push(output.id));
      this.midiOutput = access.outputs.get(ids[0]);
      console.log(this.midiOutput);
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
      const options = Object.assign({}, defaults.outputManagerOptions, { midiOutput: this.midiOutput });
      const outputManager = new OutputManager(options);
      const notes = this.$store.getters.notes;
      notes.forEach((note) => {
        const noteControl = outputManager.noteOn(note.noteOn, window.performance.now() + this.tickToMs(note.noteOn.time));
        note.modulations.forEach(modulation => {
          noteControl.modulate(modulation, window.performance.now() + this.tickToMs(note.noteOn.time + modulation.offsetTime));
        });
        noteControl.noteOff(note.noteOff, window.performance.now() + this.tickToMs(note.noteOn.time + note.noteOff.offsetTime));
      });
    },
    tickToMs (tick) {
      console.log(tick / this.tpb / this.bpm * 60 * 1e3);
      return tick / this.tpb / this.bpm * 60 * 1e3;
    }
  }
};
</script>

<style scoped>
#buttonContainer {
  height: 64px;
}
img {
  height: 100%;
}
</style>
