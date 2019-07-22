<template>
    <g>
        <g v-if="edited">
            <g class="note-action-group" v-for="(point, idx) in positions">
                <piano-roll-point
                        :point="point"
                        :color="circleColor"
                        :key="'a' + point.id"
                        opacity="0.8"
                />
                <piano-roll-line
                        :point="point"
                        :next-point="positions[idx+1]"
                        :key="'d' + point.id"
                        color="Honeydew"
                        stroke-width="2"
                />
            </g>
        </g>
        <g v-if="!edited">
            <g class="note-line" v-for="(point, idx) in positions">
                <piano-roll-point
                        :point="point"
                        :color="lineColor"
                        :key="'c' + point.id"
                        opacity="1"
                        @click="handleClick"
                        @dblclick="handleDblClick"
                />
                <piano-roll-line
                        :point="point"
                        :next-point="positions[idx+1]"
                        :color="lineColor"
                        :key="'d' + point.id"
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
  },
  components: {
    PianoRollPoint,
    PianoRollLine
  }
};
</script>

<style scoped>
</style>
