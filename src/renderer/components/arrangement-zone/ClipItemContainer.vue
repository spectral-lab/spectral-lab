<template>
  <div class="clip-item-container">
    <clip-item-layout
      :clips="clips"
      :song-duration="songDuration"
      @click="handleClick"
      @dblclick="handleDblClick"
      @contextmenu="handleContextMenu"
    />
  </div>
</template>

<script>
import ClipItemLayout from './ClipItemLayout';
import Vue from 'vue';
import { contextMenuEventHub, windowSwitchEventHub } from '../../modules';
import { SPLIT } from '../../../constants/layout';
import { Clip } from '../../store/models';
import { OUTSIDE_CLIP, CLIP } from '../../../constants/context';
import { getSongData } from '../../interactors/Song';
import { selectClip } from '../../interactors/Clip';

export default Vue.extend({
  components: {
    ClipItemLayout
  },
  props: {
    clips: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    songDuration () {
      return getSongData().songDuration;
    }
  },
  methods: {
    async handleContextMenu (ev, payload: { context: string, id: string }) {
      await selectClip(payload.id, ev);
      contextMenuEventHub.emit(ev, payload);
    },
    handleDblClick () {
      windowSwitchEventHub.emit(null, { layout: SPLIT });
    },
    handleClick (ev, payload) {
      switch (payload.context) {
        case OUTSIDE_CLIP: return this.handleClickWrapper(ev);
        case CLIP: return this.handleClickItem(ev, payload);
      }
    },
    handleClickWrapper (ev) {
      if (ev.metaKey || ev.shiftKey) return;
      Clip.update({
        where: clip => clip.selected,
        data: { selected: false }
      });
    },
    async handleClickItem (ev, payload) {
      await selectClip(payload.id, ev);
    }
  }
});
</script>

<style scoped>
    .clip-item-container {
        position: relative;
        height: 100%;
    }
</style>
