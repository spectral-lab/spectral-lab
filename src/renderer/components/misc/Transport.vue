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
import { Clip } from '../../store/models';
import { transportHeight } from '../../../constants/layout';
import Vue from 'vue';
import { midiPlayer } from '../../modules';

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
  methods: {
    playNotes () {
      const clip = Clip.query().where('selected', true).withAllRecursive().last();
      midiPlayer.play(clip);
    },
    testTone () {
      midiPlayer.testTone();
    },
    allNotesOff () {
      midiPlayer.allNotesOff();
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
