<template>
    <div ref="gridColumn" class="grid-column" v-show="isVisible" :style="{borderRightColor: color}"></div>
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
    flex: 1 1;
    height: 100%;
}
</style>
