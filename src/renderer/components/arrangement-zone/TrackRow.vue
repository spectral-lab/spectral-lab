<template>
  <div class="track-row">
    <track-header-panel
      :track="track"
      :idx="idx"
    />
    <div class="track-content">
      <div class="clip" />
    </div>
  </div>
</template>

<script>
// @flow
import TrackHeaderPanel from './TrackHeaderPanel';
import Vue from 'vue';
export default Vue.extend({
  components: {
    TrackHeaderPanel
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
    .track-content {
      background: darkgreen;
      position: relative;
    }
    .clip {
        width: 100px;
        height: 100px;
        resize: horizontal;
        position: absolute;
        left: 0%;
        overflow: auto;
        background: darkred;
    }
</style>
