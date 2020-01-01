<template>
  <icon-btn-with-tip
    @click="extractNotes"
    icon="fa-flask"
    tip="Extract notes from spectrogram"
  />
</template>

<script>
import IconBtnWithTip from '../utils/IconBtnWithTip';
import Vue from 'vue';
import { openExtractNotesDialog } from '../../usecases/extractNotes';

export default Vue.extend({
  components: {
    IconBtnWithTip
  },
  methods: {
    extractNotes () {
      openExtractNotesDialog();
    }
  }
});
</script>

<style scoped>

</style>
