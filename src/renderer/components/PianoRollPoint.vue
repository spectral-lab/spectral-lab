<template>
    <use
            :x="`${point.x * 100}%`"
            :y="`${point.y * 100}%`"
            xlink:href="#dot"
            fill="url('#dot-gradient')"
            @mousemove="handleClick"></use>
</template>

<script>
  export default {
    props: {
      point: Object,
      color: String
    },
    methods: {
      handleClick () {
        console.log('clicked');
      }
    }
  };
</script>
