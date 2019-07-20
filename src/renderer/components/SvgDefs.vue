<template>
    <defs>
        <circle id="dot" cx="0" cy="0" r="5"></circle>
        <linearGradient id="dot-gradient" gradientTransform="rotate(90)">
            <stop offset="20%" stop-color="gold"></stop>
            <stop offset="90%" stop-color="red"></stop>
        </linearGradient>
    </defs>
</template>

<script>
    export default {
      methods: {
        handleClick () {
          console.log('clicked');
        }
      }
    };
</script>

