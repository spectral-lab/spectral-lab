<template>
  <g>
    <g v-if="edited">
      <g
        v-for="(point, idx) in positions"
        :key="'a' + point.id"
        class="note-action-group"
      >
        <piano-roll-point
          :key="'b' + point.id"
          :point="point"
          :color="circleColor"
          opacity="0.8"
        />
        <piano-roll-line
          :key="'c' + point.id"
          :point="point"
          :next-point="positions[idx+1]"
          color="Honeydew"
          stroke-width="2"
        />
      </g>
    </g>
    <g v-if="!edited">
      <g
        v-for="(point, idx) in positions"
        :key="'d' + point.id"
        class="note-line"
      >
        <piano-roll-point
          :key="'e' + point.id"
          :point="point"
          :color="lineColor"
          opacity="1"
          @click="handleClick"
          @dblclick="handleDblClick"
        />
        <piano-roll-line
          :key="'f' + point.id"
          :point="point"
          :next-point="positions[idx+1]"
          :color="lineColor"
          opacity="1"
          stroke-width="10"
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
import PianoRollPoint from './PianoRollPoint';
import PianoRollLine from './PianoRollLine';

export default {
  components: {
    PianoRollPoint,
    PianoRollLine
  },
  props: {
    note: Note,
    totalTicks: Number,
    selectedNoteIds: Array,
    editingNoteId: String
  },
  computed: {
    selected () {
      return this.selectedNoteIds.includes(this.note.id);
    },
    edited () {
      return this.editingNoteId === this.note.id;
    },
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
      if (this.selected) return 'Honeydew';
      return this.note.parent.color;
    },
    circleColor () {
      return this.note.parent.color;
    }
  },
  methods: {
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
