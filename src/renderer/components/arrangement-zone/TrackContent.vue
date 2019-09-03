<template>
  <div
    :style="{ backgroundColor: bgColor }"
    class="track-content"
  >
    <div class="clip-item-wrapper">
      <div
        v-for="clip in clips"
        :key="clip.id"
        class="clip-item-container"
      >
        <clip-item :clip="clip" />
      </div>
    </div>
  </div>
</template>

<script>
// @flow
import Color from 'color';
import Vue from 'vue';
import ClipItem from './ClipItem';
export default Vue.extend({
  components: {
    ClipItem
  },
  props: {
    track: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    bgColor () {
      return Color(this.track.color).darken(0.7).mix(Color('grey')).string();
    },
    clips () {
      return this.track.clips;
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
