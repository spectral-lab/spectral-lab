<template>
  <div
    :style="{ backgroundColor: bgColor, width: '300px' }"
    class="clip-item"
  >
    <div class="clip-title">
      {{ clip.name }}
    </div>
    <div class="clip-content" />
  </div>
</template>

<script>
// @flow
import Vue from 'vue';
import Color from 'color';
export default Vue.extend({
  components: {},
  props: {
    clip: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    bgColor () {
      return Color(this.clip.color).darken(0.1).string();
    },
    notes () {
      console.log(this.clip);
      return this.clip.notes;
    }
  }
});
</script>

<style scoped>
    .clip-item {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .clip-title {
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 0 0 28px;
    }

    .clip-content {
        flex: 1 1 auto;
    }
</style>
