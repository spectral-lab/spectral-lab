<template>
    <line
            v-if="nextPoint"
            :x1="`${point.x * 100}%`"
            :y1="`${point.y * 100}%`"
            :x2="`${nextPoint.x * 100}%`"
            :y2="`${nextPoint.y * 100}%`"
            :stroke="color"
            :stroke-width="strokeWidth"
            :opacity="opacity"
            @click="handleEvent"
            @dblclick="handleEvent"
    ></line>
</template>

<script>
  export default {
    props: {
      point: Object,
      nextPoint: Object,
      color: String,
      strokeWidth: String,
      opacity: String
    },
    methods: {
      handleEvent (ev) {
        this.$emit(ev.type, ev, this.point.id);
      }
    }
  };
</script>
