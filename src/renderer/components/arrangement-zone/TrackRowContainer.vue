<template>
  <div class="track-container">
    <div
      v-for="(track, idx) in tracks"
      :key="track.id"
    >
      <track-row
        :track="track"
        :idx="idx"
      />
    </div>
  </div>
</template>

<script>
import TrackRow from './TrackRow';
import { Track } from '../../store/models';
import { SONG_ID } from '../../../constants/ids';
export default {
  components: {
    TrackRow
  },
  computed: {
    tracks () {
      return Track.query().where('songId', SONG_ID).withAllRecursive().get();
    }
  }
};
</script>

<style scoped>
    .track-container {
    }
</style>
