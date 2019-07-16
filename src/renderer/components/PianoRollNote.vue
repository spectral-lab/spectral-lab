<template>
    <div>
    </div>
</template>

<script>
import * as teoria from 'teoria';

export default {
  props: {
    note: {
      id: Number,
      noteOn: Object,
      noteOff: Object,
      modulations: Array
    }
  },
  mounted () {
    console.log(this.note);
  }
};
</script>

<style scoped>
</style>
