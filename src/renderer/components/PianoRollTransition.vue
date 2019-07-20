<template>
    <div class="point-wrapper">
        <div v-for="point in positions" class="pitch-points">
            <piano-roll-point :point="point" :color="color"/>
        </div>
    </div>
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
    components: {
      PianoRollPoint
    }
  };
</script>

<style scoped>
    .point-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
