<template>
  <circle
    :cx="`${point.x * 100}%`"
    :cy="`${point.y * 100}%`"
    r="5"
    :fill="color"
    :opacity="opacity"
  />
</template>

<script>
export default {
  props: {
    point: Object,
    color: String,
    opacity: String
  },
  methods: {
    handleEvent (ev) {
      this.$emit(ev.type, ev, this.point.id);
    }
  }
};
</script>
