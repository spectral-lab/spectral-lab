<template>
  <div class="clip-item-container">
    <clip-item-layout
      :clips="clips"
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
  methods: {
    handleContextMenu (ev, payload) {
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
    handleClickItem (ev, payload) {
      const { id } = payload;
      if (!(ev.metaKey || ev.shiftKey)) {
        Clip.update({
          where: clip => clip.selected && clip.id !== id,
          data: { selected: false }
        });
      }
      Clip.update({
        where: id,
        data: { selected: true }
      });
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
