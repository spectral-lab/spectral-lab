<template>
  <div
    :style="{ backgroundColor: bgColor, width: '300px', borderColor: borderColor }"
    @contextmenu.prevent="handleContextMenu"
    @click="handleClick"
    class="clip-item"
  >
    <div class="clip-title">
      {{ clip.name }}
    </div>
    <div
      @dblclick="handleDblClick"
      class="clip-content"
    />
  </div>
</template>

<script>
// @flow
import Vue from 'vue';
import Color from 'color';
import { CLIP } from '../../../constants/model-types';
import { CLICK, CONTEXT_MENU, DBL_CLICK } from '../../../constants/event-types';
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
    borderColor () {
      if (this.clip.selected) return 'Honeydew';
      return 'transparent';
    },
    notes () {
      return this.clip.notes;
    }
  },
  methods: {
    handleContextMenu (ev) {
      this.$emit(CONTEXT_MENU, ev, {
        context: CLIP,
        id: this.clip.id
      });
    },
    handleClick (ev) {
      this.$emit(CLICK, ev, {
        context: CLIP,
        id: this.clip.id
      });
    },
    handleDblClick (ev) {
      this.$emit(DBL_CLICK, ev, {
        context: CLIP,
        id: this.clip.id
      });
    }
  }
});
</script>

<style scoped>
    .clip-item {
        height: 100%;
        display: flex;
        flex-direction: column;
        border: solid 2px;
        border-radius: 3%;
    }

    .clip-title {
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 0 0 28px;
        padding: 0 5%;
    }

    .clip-content {
        flex: 1 1 auto;
    }
</style>
