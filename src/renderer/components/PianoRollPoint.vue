<template>
    <div
        class="point"
        :style="{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`,
            borderColor: color,
            background: color,
        }"
        draggable="true"
        @dragstart="emitDragStart"
        @dragend="emitDragEnd"
        @click="emitSelected"
    ></div>
</template>

<script>
  export default {
    props: {
      point: Object,
      color: String
    },
    methods: {
      emitSelected () {
        console.log('selected');
      },
      emitDragStart () {
        console.log('start');
      },
      emitDragEnd () {
        console.log('end');
      }
    }
  };
</script>

<style scoped>
    .point {
        border-radius: 50%;
        border: 1px solid;
        position: absolute;
        width: 7px;
        height: 7px;
        z-index: 1000;
    }
</style>
