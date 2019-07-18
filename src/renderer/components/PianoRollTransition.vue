<template>
    <div class="point-wrapper">
        <div v-for="point in positions"
             class="pitch"
             :style="{
                left: `${point.x * 100}%`,
                top: `${point.y * 100}%`,
                borderColor: color
             }"
        >
        </div>
    </div>
</template>

<script>
  import { tickToPosX, pitchToPosY } from '../modules/pianoRoll/utils';
  export default {
    props: {
      transition: Array,
      type: String,
      totalTicks: Number,
      color: String
    },
    computed: {
      positions () {
        if (this.type === 'PITCH') {
          return this.transition.map(point => ({
            x: tickToPosX(point.time, this.totalTicks),
            y: pitchToPosY(point.pitch)
          }));
        }
        if (this.type === 'AMP') {
          return this.transition.map(point => ({
            x: tickToPosX(point.time, this.totalTicks),
            y: point.amp
          }));
        }
      }
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
    .pitch {
        border-radius: 50%;
        border: 1px solid;
        position: absolute;
        width: 7px;
        height: 7px;
    }
</style>
