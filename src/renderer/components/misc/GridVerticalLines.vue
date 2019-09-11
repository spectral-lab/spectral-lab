<template>
  <svg
    width="100%"
    height="100%"
  >
    <g
      v-for="item in sourceItems"
      :key="item.id"
    >
      <line
        :x1="`${(item.absoluteTime-startTime)/duration*100}%`"
        :y1="`${0}%`"
        :x2="`${(item.absoluteTime-startTime)/duration*100}%`"
        :y2="`${100}%`"
        :style="{ stroke: color, strokeWidth: width }"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'grey'
    },
    /** in pixel */
    width: {
      type: Number,
      default: 1
    },
    /** {Bar|Beat}**/
    sourceItems: {
      type: Array,
      default: () => []
    },
    startTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped>

</style>
