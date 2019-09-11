<template>
  <div class="track-container">
    <div
      v-for="(track, idx) in tracks"
      :key="track.id"
    >
      <track-row
        :track="track"
        :idx="idx"
        @click="handleClick"
        @contextmenu="handleContextMenu"
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
import { contextMenuEventHub, dialogEventHub } from '../../modules';

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
      if (payload.type === 'panel') {
        const { id } = payload;
        if (!(ev.metaKey || ev.shiftKey)) {
          Track.update({
            where: track => track.selected && track.id !== id,
            data: { selected: false }
          });
        }
        Track.update({
          where: id,
          data: { selected: true }
        });
      }
    },
    handleContextMenu (ev, payload) {
      contextMenuEventHub.emit(ev, payload);
    }
  }
};
</script>

<style scoped>
</style>
