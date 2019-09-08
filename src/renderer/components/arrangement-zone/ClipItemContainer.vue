<template>
  <div
    @click="handleClickWrapper"
    class="clip-item-wrapper"
  >
    <div
      v-for="clip in clips"
      :key="clip.id"
      class="clip-item-container"
    >
      <clip-item
        :clip="clip"
        @click="handleClickItem"
        @contextmenu="handleContextMenu"
        @dblclick="handleDblClick"
      />
    </div>
  </div>
</template>

<script>
import ClipItem from './ClipItem';
import Vue from 'vue';
import { contextMenuEventHub, windowSwitchEventHub } from '../../modules';
import { SPLIT } from '../../../constants/layout';
import { Clip } from '../../store/models';
export default Vue.extend({
  components: {
    ClipItem
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
    handleClickWrapper (ev) {
      if (ev.target.matches('.clip-item-wrapper')) {
        if (ev.metaKey || ev.shiftKey) return;
        Clip.update({
          where: clip => clip.selected,
          data: { selected: false }
        });
      }
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
    .clip-item-wrapper {
        position: relative;
        height: 100%;
    }
    .clip-item-container {
        position: absolute;
        height: 100%;
    }
</style>
