<template>
  <div
    ref="gridColumn"
    v-show="isVisible"
    :style="{borderRightColor: color}"
    class="grid-column"
  />
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    color: String
  }
};
</script>

<style scoped>
.grid-column {
    z-index: 31;
    border-right: solid 1px;
    border-right-color: black;
    height: 100%;
}
</style>
