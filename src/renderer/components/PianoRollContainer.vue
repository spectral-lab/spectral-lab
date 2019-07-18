<template>
    <div ref="pianoRollContainer" class="piano-roll-container">
        <piano-roll
                ref="pianoRoll"
                :total-bars="totalBars"
                :beats-in-bar="song.beatsInBar"
                :ticks-per-beat="song.ticksPerBeat"
                :notes="notes"
        />
    </div>
</template>

<script>
import PianoRoll from './PianoRoll';
import mockEntities from '../../../test/data/mockEntities';
import { SET_ENTITIES } from '../store/mutation-types';
import { Clip, Song } from '../store/models';

export default {
  computed: {
    song () {
      return Song.query().last();
    },
    clip () {
      return Clip.query().where('selected', true).withAllRecursive().last();
    },
    notes () {
      return this.clip.notes;
    },
    totalBars () {
      return Math.ceil(this.clip.duration / this.song.ticksPerBeat / this.song.beatsInBar);
    }
  },
  methods: {
    loadMockNotes () {
      this.$store.commit(SET_ENTITIES, mockEntities);
    }
  },
  components: {
    PianoRoll
  }
};
</script>

<style scoped>
.piano-roll-container{
    height: 60vh;
}
</style>

