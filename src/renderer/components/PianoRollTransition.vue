<template>
    <g>
        <g v-for="point in positions">
            <piano-roll-point :point="point" :color="color"/>
        </g>
    </g>
</template>

<script>
  import { tickToPosX, pitchToPosY } from '../modules/pianoRoll/utils';
  import PianoRollPoint from './PianoRollPoint';
  export default {
    props: {
      transition: Array,
      transitionType: String,
      totalTicks: Number,
      color: String
    },
    computed: {
      positions () {
        if (this.transitionType === 'PITCH') {
          return this.transition.map(point => ({
            x: tickToPosX(point.offsetTime, this.totalTicks),
            y: pitchToPosY(point.pitch),
            id: point.id,
            type: point.type
          }));
        }
        if (this.transitionType === 'AMP') {
          return this.transition.map(point => ({
            x: tickToPosX(point.offsetTime, this.totalTicks),
            y: point.amp,
            id: point.id,
            type: point.type
          }));
        }
      }
    },
    methods: {
      handleMouseDown () {
        console.log('mousedown');
      }
    },
    components: {
      PianoRollPoint
    }
  };
</script>

<style scoped>
</style>
