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
          @contextmenu="handleContextMenu"
        />
        <circle
          :cx="`${point.x * 100}%`"
          :cy="`${point.y * 100}%`"
          :fill="circleColor"
          @click="handleClick"
          @dblclick="handleDblClick"
          @contextmenu="handleContextMenu"
          r="5"
        />
      </g>
    </g>
  </g>
</template>

<script>
// @flow
import { tickToPosX, pitchToPosY } from '../../utils/view/pianoRoll/utils';
import { CLICK, CONTEXT_MENU, DBL_CLICK } from '../../../constants/event-types';

export default {
  props: {
    note: {
      type: Object,
      default: () => ({})
    },
    color: {
      type: String,
      default: 'grey'
    },
    totalTicks: {
      type: Number,
      default: 4800
    },
    isEdited: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pitchTransition () {
      return this.note.pitchTransition;
    },
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
      if (this.note.selected) return 'Honeydew';
      return this.color;
    },
    circleColor () {
      if (this.isEdited) return this.color;
      if (this.note.selected) return 'Honeydew';
      return this.color;
    }
  },
  methods: {
    nextPoint (idx) {
      return this.positions[idx + 1];
    },
    handleClick (ev) {
      this.$emit(CLICK, ev, this.note.id);
    },
    handleDblClick (ev) {
      this.$emit(DBL_CLICK, ev, this.note.id);
    },
    handleContextMenu (ev) {
      this.$emit(CONTEXT_MENU, ev, this.note.id);
    }
  }
};
</script>

<style scoped>
</style>
