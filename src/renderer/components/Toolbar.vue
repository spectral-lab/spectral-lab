<template>
  <div>
    <v-layout row>
      <v-toolbar color="grey darken-3">
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
              @click="emitExtractNotes"
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
      </v-toolbar>
    </v-layout>
  </div>
</template>

<script>
import IconBtnWithTip from './IconBtnWithTip';
import * as MOUSE_MODES from '../constants/mouse-modes';

export default {
  components: {
    IconBtnWithTip
  },
  methods: {
    emitMouseMode (modeIdx) {
      switch (modeIdx) {
        case 0:
          this.$emit('mouse-mode', MOUSE_MODES.SELECT);
          break;
        case 1:
          this.$emit('mouse-mode', MOUSE_MODES.PEN);
          break;
      }
    },
    emitExtractNotes () {
      this.$emit('extract-notes');
    },
    deleteAllNotes () {
      this.$store.dispatch('DELETE_ALL_NOTES');
    }
  }
};
</script>


