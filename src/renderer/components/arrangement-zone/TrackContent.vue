<template>
  <div
    :style="{ backgroundColor: bgColor }"
    class="track-content"
  >
    <slot name="clips" />
  </div>
</template>

<script>
// @flow
import Color from 'color';
import Vue from 'vue';

export default Vue.extend({
  props: {
    track: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    bgColor () {
      return Color(this.track.color).darken(0.7).mix(Color('grey')).string();
    }
  }
});
</script>

<style scoped>
</style>
