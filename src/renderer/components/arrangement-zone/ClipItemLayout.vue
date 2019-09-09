<template>
  <div
    @click="handleClickWrapper"
    class="clip-item-layout"
  >
    <div
      v-for="clip in clips"
      :key="clip.id"
      :style="{
        left: `${clip.offsetTime / songDuration * 100}%`,
        width: `${clip.duration / songDuration * 100}%`
      }"
      class="clip-item-wrapper"
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
import { CLICK, CONTEXT_MENU, DBL_CLICK } from '../../../constants/event-types';
import { OUTSIDE_CLIP } from '../../../constants/context';
import { songDuration } from '../../../constants/defaults';

export default Vue.extend({
  components: {
    ClipItem
  },
  props: {
    clips: {
      type: Array,
      default: () => []
    },
    songDuration: {
      type: Number,
      default: songDuration
    }
  },
  methods: {
    handleContextMenu (ev, payload) {
      this.$emit(CONTEXT_MENU, ev, payload);
    },
    handleDblClick (ev) {
      this.$emit(DBL_CLICK, ev);
    },
    handleClickWrapper (ev) {
      if (ev.target.matches('.clip-item-layout')) {
        this.$emit(CLICK, ev, { context: OUTSIDE_CLIP });
      }
    },
    handleClickItem (ev, payload) {
      this.$emit(CLICK, ev, payload);
    }
  }
});
</script>

<style scoped>
    .clip-item-layout {
        position: relative;
        height: 100%;
    }
    .clip-item-wrapper {
        position: absolute;
        height: 100%;
    }
</style>
