<template>
  <div class="clip-item-wrapper">
    <div
      v-for="clip in clips"
      :key="clip.id"
      class="clip-item-container"
    >
      <clip-item :clip="clip" />
    </div>
  </div>
</template>

<script>
import ClipItem from './ClipItem';
import Vue from 'vue';
export default Vue.extend({
  components: {
    ClipItem
  },
  props: {
    clips: {
      type: Array,
      default: () => []
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
