<template>
  <icon-btn-with-tip
    @click="extractNotes"
    icon="fa-flask"
    tip="Extract notes from spectrogram"
  />
</template>

<script>
import IconBtnWithTip from './IconBtnWithTip';
import Vue from 'vue';
import { extractNotes } from '../usecases/extractNotes';

export default Vue.extend({
  components: {
    IconBtnWithTip
  },
  methods: {
    extractNotes () {
      extractNotes();
    }
  }
});
</script>

<style scoped>

</style>
