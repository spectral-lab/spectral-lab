<template>
  <g>
    <g v-if="isEdited">
      <g
        v-for="(point, idx) in positions"
        :key="'a' + point.id"
        class="note-action-group"
      >
        <line
          v-if="prevPoint(idx)"
          :key="'c' + point.id"
          :x1="`${point.x * 100}%`"
          :y1="`${point.y * 100}%`"
          :x2="`${prevPoint(idx).x * 100}%`"
          :y2="`${prevPoint(idx).y * 100}%`"
          stroke="Honeydew"
          :stroke-width="2"
          :opacity="1"
        />
        <circle
          :cx="`${point.x * 100}%`"
          :cy="`${point.y * 100}%`"
          r="5"
          :fill="circleColor"
          :opacity="0.8"
        />
      </g>
    </g>
    <g v-else>
      <g
        v-for="(point, idx) in positions"
        :key="'d' + point.id"
        class="note-line"
      >
        <line
          v-if="positions[idx-1]"
          :key="'f' + point.id"
          :x1="`${point.x * 100}%`"
          :y1="`${point.y * 100}%`"
          :x2="`${prevPoint(idx).x * 100}%`"
          :y2="`${prevPoint(idx).y * 100}%`"
          :stroke="lineColor"
          :stroke-width="10"
          :opacity="1"
          @click="handleClick"
          @dblclick="handleDblClick"
        />
        <circle
          :cx="`${point.x * 100}%`"
          :cy="`${point.y * 100}%`"
          r="5"
          :fill="circleColor"
          :opacity="1"
          @click="handleClick"
          @dblclick="handleDblClick"
        />
      </g>
    </g>
  </g>
</template>

<script>
import { Note } from '../store/models';
import { tickToPosX, pitchToPosY } from '../modules/pianoRoll/utils';

export default {
  props: {
    note: Note,
    totalTicks: Number,
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
      return this.transition.map(point => ({
        x: tickToPosX(point.offsetTime, this.totalTicks),
        y: pitchToPosY(point.pitch),
        id: point.id,
        type: point.type
      }));
    },
    transition () {
      return this.note.pitchTransition;
    },
    lineColor () {
      if (this.isSelected) return 'Honeydew';
      return this.note.parent.color;
    },
    circleColor () {
      if (this.isEdited) return 'Honeydew';
      return this.note.parent.color;
    }
  },
  methods: {
    prevPoint (idx) {
      return this.positions[idx - 1];
    },
    handleClick (ev) {
      this.$emit('click', ev, this.note.id);
    },
    handleDblClick (ev) {
      this.$emit('dblclick', ev, this.note.id);
    }
  }
};
</script>

<style scoped>
</style>
