<template>
  <v-slider
    :value="value"
    @input="debouncedHandleInput"
    @click:prepend="handleClickGrid"
    @click:append="handleClickWaves"
    prepend-icon="grid_on"
    append-icon="waves"
    thumb-color="rgb(0, 139, 139)"
  />
</template>

<script>
import { PianoRoll } from '../../store/models';
import { debounce } from 'lodash';

export default {
  computed: {
    pianoRoll () {
      return PianoRoll.query().first();
    },
    value () {
      const { spectrogramOpacity, gridOpacity } = this.pianoRoll;
      if (spectrogramOpacity < 1) return spectrogramOpacity * 50;
      return (1 - gridOpacity) * 50 + 50;
    }
  },
  created () {
    this.debouncedHandleInput = debounce(this.handleInput, 60);
  },
  methods: {
    handleInput (val) {
      if (val > 50) {
        PianoRoll.update({
          where: this.pianoRoll.id,
          data: {
            gridOpacity: 1 - (val - 50) / 50,
            spectrogramOpacity: 1
          }
        });
      }
      if (val <= 50) {
        PianoRoll.update({
          where: this.pianoRoll.id,
          data: {
            gridOpacity: 1,
            spectrogramOpacity: val / 50
          }
        });
      }
    },
    handleClickGrid () {
      PianoRoll.update({
        where: this.pianoRoll.id,
        data: {
          gridOpacity: 1,
          spectrogramOpacity: 0
        }
      });
    },
    handleClickWaves () {
      PianoRoll.update({
        where: this.pianoRoll.id,
        data: {
          gridOpacity: 0,
          spectrogramOpacity: 1
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
