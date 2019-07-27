<template>
  <div
    v-show="isVisible"
    ref="gridColumn"
    class="grid-column"
    :style="{borderRightColor: color}"
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
