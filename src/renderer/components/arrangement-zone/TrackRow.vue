<template>
  <div class="track-row">
    <track-header-panel
      @click="handleClick"
      @contextmenu="handleContextMenu"
      :track="track"
      :idx="idx"
    />
    <track-content
      :track="track"
    >
      <template slot="clips">
        <slot name="clips" />
      </template>
    </track-content>
  </div>
</template>

<script>
// @flow
import TrackHeaderPanel from './TrackHeaderPanel';
import TrackContent from './TrackContent';
import Vue from 'vue';
import { CLICK, CONTEXT_MENU } from '../../../constants/event-types';

export default Vue.extend({
  components: {
    TrackHeaderPanel,
    TrackContent
  },
  props: {
    idx: {
      type: Number,
      default: 1
    },
    track: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleClick (ev, payload) {
      this.$emit(CLICK, ev, payload);
    },
    handleContextMenu (ev, payload) {
      this.$emit(CONTEXT_MENU, ev, payload);
    }
  }
});
</script>

<style scoped>
    .track-row {
        background: grey;
        height: 150px;
        position: relative;
        display: grid;
        grid-template-columns: 250px 1fr;
    }
</style>
