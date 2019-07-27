<template>
  <div
    ref="elasticContainer"
    class="elastic-container"
    :style="{
      gridTemplateRows
    }"
  >
    <div class="upper-content">
      <slot name="upper" />
    </div>
    <div
      ref="border"
      class="border"
    />
    <div class="lower-content">
      <slot name="lower" />
    </div>
  </div>
</template>

<script>
import { clamp } from 'lodash';
import { getOffsetTopFromRoot } from '../modules/pianoRoll/utils';
import elementResizeDetector from 'element-resize-detector';

export default {
  props: {
    borderWidth: {
      type: Number,
      default: 12 // px
    },
    upperContentHeight: {
      type: Number,
      default: 100 // px
    }
  },
  data () {
    return {
      containerClientHeight: 0,
      containerOffsetTop: 0
    };
  },
  computed: {
    gridTemplateRows () {
      if (this.upperContentHeight < this.borderWidth * 0.5) {
        // If there is no space for the upmost row, the border needs to shrink.
        return `0px ${this.upperContentHeight}px ${this.borderWidth * 0.5}px 1fr`;
      }
      if (this.upperContentHeight > this.containerClientHeight - this.borderWidth * 0.5) {
        // If there is no space for the lowest row, the border needs to shrink.
        return `${this.upperContentHeight - this.borderWidth * 0.5}px ${this.borderWidth * 0.5}px 1fr 0px`;
      }
      return `${this.upperContentHeight - this.borderWidth * 0.5}px ${this.borderWidth * 0.5}px ${this.borderWidth * 0.5}px 1fr`;
    }
  },
  mounted () {
    elementResizeDetector({ strategy: 'scroll' }).listenTo(this.$refs.elasticContainer, (element) => {
      this.containerClientHeight = element.clientHeight;
      this.containerOffsetTop = getOffsetTopFromRoot(element);
    });
    this.makeDraggable();
  },
  methods: {
    makeDraggable () {
      let dragging = false;
      this.$refs.border.addEventListener('mousedown', () => {
        document.body.style.cursor = 'row-resize';
        dragging = true;
      });
      document.addEventListener('mouseup', () => {
        if (!dragging) return;
        document.body.style.cursor = 'default';
        dragging = false;
      });
      document.addEventListener('mousemove', (ev) => {
        if (!dragging) return;
        this.$emit('change-height', {
          upperHeight: clamp(
            ev.pageY - this.containerOffsetTop,
            0,
            Math.max(this.$refs.elasticContainer.clientHeight, 1)
          )
        });
      });
    }
  }
};
</script>

<style scoped>
    .elastic-container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        overflow: hidden;
    }
    .upper-content {
        grid-area: 1 / 1 / 3 / 2;
        overflow: auto;
    }
    .lower-content {
        grid-area: 3 / 1 / 5 / 2;
        overflow: auto;
    }
    .border {
        grid-area: 2 / 1 / 4 / 2;
        z-index: 1000;
        cursor: row-resize;
        background: transparent;
    }
</style>
