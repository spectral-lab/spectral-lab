<template>
  <div>
    <v-layout column>
      <v-flex>
        <Toolbar @mousemode="handleMouseMode"/>
      </v-flex>
      <v-flex>
        <info-bar />
      </v-flex>
      <v-flex>
        <canvas ref="spectrogram"></canvas>
      </v-flex>
      <v-flex>
        <div ref="pianoRoll"></div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Toolbar from './PianoRollToolbar';
import InfoBar from './PianoRollInfoBar';
import * as MOUSE_MODES from '../constants/mouse-modes';
import { renderSpectrogram } from '../modules/render';
import PianoRoll from '../modules/pianoRoll';
import preludeInC from '../../../static/midi/preludeInC';

export default {
  data () {
    return {
      mouseMode: MOUSE_MODES.SELECT,
      areaToDisplay: {
        upperLeftCorner: {
          time: 0,
          pitch: 120
        },
        numberOfTicks: 50,
        numberOfNoteNumbers: 100
      }
    };
  },
  mounted () {
    this.$store.watch(
      (state) => state.spectrogram,
      (newSpectrogram) => {
        renderSpectrogram(newSpectrogram, this.$refs.spectrogram);
      },
      { deep: true }
    );
    const pianoRoll = new PianoRoll(this.$refs.pianoRoll);
    pianoRoll.setScore(preludeInC);
    pianoRoll.stop();
  },
  methods: {
    handleMouseMode (m) {
      this.mouseMode = m;
    }
  },
  components: {
    Toolbar,
    InfoBar
  }
};
</script>

<style>
#RollContainer {
  position: absolute;
  width: 100%;
  height: calc(100% - 120px);
  left: 0px;
  top: 0px;
  overflow: hidden;
}
#ScrollContainer {

  height: calc(100% + 25px);
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow-y: hidden;
  overflow-x: scroll;
}
#PianoRoll{
  display: inline;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 1;
  background-color: transparent;
}


#TriggerLine {
  position: absolute;
  left: calc(50% - 3px / 2);
  height: 100%;
  background-color: black;
  width: 3px;
  z-index: 2;
  opacity: 0.1;
  pointer-events: none;
}

#ScoreCanvas {
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 0;
  height: calc(100% - 25px);
}

</style>


