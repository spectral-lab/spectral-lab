<template>
  <div class="track-container">
    <div
      v-for="(track, idx) in tracks"
      :key="track.id"
    >
      <track-row
        :track="track"
        :idx="idx"
      >
        <template slot="clips">
          <clip-item-container :clips="track.clips" />
        </template>
      </track-row>
    </div>
  </div>
</template>

<script>
import TrackRow from './TrackRow';
import ClipItemContainer from './ClipItemContainer';
import { Track } from '../../store/models';
import { SONG_ID } from '../../../constants/ids';
import { TRACK } from '../../../constants/model-types';
import { INSPECT } from '../../../constants/dialog-types';
import { dialogEventHub } from '../../modules';

export default {
  components: {
    TrackRow,
    ClipItemContainer
  },
  computed: {
    tracks () {
      return Track.query().where('songId', SONG_ID).withAllRecursive().get();
    }
  },
  methods: {
    handleClick (ev, payload) {
      if (payload.type === 'setting') {
        dialogEventHub.emit(null, {
          type: INSPECT,
          context: TRACK,
          id: payload.id
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
