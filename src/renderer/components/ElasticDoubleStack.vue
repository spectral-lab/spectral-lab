<template>
    <div
            class="elastic-container"
            ref="elasticContainer"
            :style="{
                gridTemplateRows
            }"
    >
        <div class="upper-content">
            <slot name="upper"></slot>
        </div>
        <div class="border" ref="border"></div>
        <div class="lower-content">
            <slot name="lower"></slot>
        </div>
    </div>

</template>

<script>
  import { clamp } from 'lodash';
  import { getOffsetTop } from '../modules/pianoRoll/utils';

  export default {
    data () {
      return {
        upperContentHeight: this.initialUpperContentHeight
      };
    },
    props: {
      handleWidth: {
        type: Number,
        default: 12 // px
      },
      initialUpperContentHeight: {
        type: Number,
        default: 100 // px
      }
    },
    mounted () {
      this.makeDraggable();
    },
    computed: {
      gridTemplateRows () {
        if (this.upperContentHeight < 0) {
          return `0px ${this.handleWidth * 0.5 + this.upperContentHeight}px ${this.handleWidth * 0.5}px 1fr`;
        }
        return `${this.upperContentHeight - this.handleWidth * 0.5}px ${this.handleWidth * 0.5}px ${this.handleWidth * 0.5}px 1fr`;
      }
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
          this.upperContentHeight = clamp(
            ev.pageY - getOffsetTop(this.$refs.elasticContainer),
            -this.handleWidth * 0.5,
            Math.max(this.$refs.elasticContainer.clientHeight, 1)
          );
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
        background: darkblue;
        grid-area: 1 / 1 / 3 / 2;
        overflow: auto;
    }
    .lower-content {
        grid-area: 3 / 1 / 5 / 2;
        background: darkgreen;
        overflow: auto;
    }
    .border {
        grid-area: 2 / 1 / 4 / 2;
        z-index: 1000;
        cursor: row-resize;
        background: transparent;
    }

</style>
