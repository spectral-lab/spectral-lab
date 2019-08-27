<template>
  <g>
    <defs>
      <filter id="shadow">
        <feDropShadow
          dx="0.2"
          dy="0.4"
          std-deviation="2"
        />
      </filter>
    </defs>
    <g
      v-if="isEdited"
    >
      <g
        v-for="(point, idx) in positions"
        :key="'a' + point.id"
        class="note-action-group"
      >
        <line
          v-if="nextPoint(idx)"
          :key="'c' + point.id"
          :x1="`${point.x * 100}%`"
          :y1="`${point.y * 100}%`"
          :x2="`${nextPoint(idx).x * 100}%`"
          :y2="`${nextPoint(idx).y * 100}%`"
          :stroke="lineColor"
          :stroke-width="2"
        />
        <circle
          :cx="`${point.x * 100}%`"
          :cy="`${point.y * 100}%`"
          :fill="circleColor"
          r="5"
          style="filter:url(#shadow);"
        />
      </g>
    </g>
    <g
      v-else
      style="filter:url(#shadow);"
    >
      <g
        v-for="(point, idx) in positions"
        :key="'d' + point.id"
        class="note-line"
      >
        <line
          v-if="nextPoint(idx)"
          :key="'f' + point.id"
          :x1="`${point.x * 100}%`"
          :y1="`${point.y * 100}%`"
          :x2="`${nextPoint(idx).x * 100}%`"
          :y2="`${nextPoint(idx).y * 100}%`"
          :stroke="lineColor"
          :stroke-width="10"
          @click="handleClick"
          @dblclick="handleDblClick"
        />
        <circle
          :cx="`${point.x * 100}%`"
          :cy="`${point.y * 100}%`"
          :fill="circleColor"
          @click="handleClick"
          @dblclick="handleDblClick"
          r="5"
        />
      </g>
    </g>
  </g>
</template>

<script>
import { tickToPosX, pitchToPosY } from '../../utils/view/pianoRoll/utils';

export default {
  props: {
    noteId: {
      type: String,
      default: 'no_id'
    },
    pitchTransition: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: 'grey'
    },
    totalTicks: {
      type: Number,
      default: 4800
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isEdited: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    positions () {
      return this.pitchTransition.map(point => ({
        x: tickToPosX(point.offsetTime, this.totalTicks),
        y: pitchToPosY(point.pitch),
        id: point.id,
        type: point.type
      }));
    },
    lineColor () {
      if (this.isEdited) return 'Honeydew';
      if (this.isSelected) return 'Honeydew';
      return this.color;
    },
    circleColor () {
      if (this.isEdited) return this.color;
      if (this.isSelected) return 'Honeydew';
      return this.color;
    }
  },
  methods: {
    nextPoint (idx) {
      return this.positions[idx + 1];
    },
    handleClick (ev) {
      this.$emit('click', ev, this.noteId);
    },
    handleDblClick (ev) {
      this.$emit('dblclick', ev, this.noteId);
    }
  }
};
</script>

<style scoped>
</style>
