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
import { range } from 'lodash';

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
      const outputManager = new OutputManager({
        midiOutput: this.midiOutput,
        // midiOutput: {
        //   send: (midiMessage, timestamp) => {
        //     setTimeout(() => {
        //       console.log(midiMessage);
        //     });
        //     this.midiOutput.send(midiMessage, timestamp);
        //   }
        // },
        pitchBendRange: 48,
        nowCb: () => window.performance.now(),
        memberChannels: range(2, 17),
        masterChannels: [1]
      });
      const notes = this.$store.getters.notes;
      notes.forEach((note) => {
        const noteOn = Object.assign({}, note.noteOn);
        const noteControl = outputManager.noteOn(noteOn, window.performance.now() + noteOn.time * 1000);
        note.modulations.forEach(modulation => {
          noteControl.modulate(Object.assign({}, modulation), window.performance.now() + (noteOn.time + modulation.offsetTime) * 1000);
        });
        noteControl.noteOff(Object.assign({}, note.noteOff), window.performance.now() + (noteOn.time + note.noteOff.offsetTime) * 1000);
      });
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
