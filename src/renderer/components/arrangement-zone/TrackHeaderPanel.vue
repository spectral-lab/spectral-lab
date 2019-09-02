<template>
  <v-card
    :color="bgColor"
    class="track-header-panel"
  >
    <v-card-title primary-title>
      <h3>
        {{ idx }} {{ track.name }}
      </h3>
    </v-card-title>
    <v-card-actions>
      <v-layout row>
        <v-spacer />
        <icon-btn-with-tip
          :color="bgColor"
          icon="fa-cog"
          tip="Tack setting"
        />
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
// @flow
import IconBtnWithTip from '../misc/IconBtnWithTip';
import Color from 'color';
import Vue from 'vue';
export default Vue.extend({
  components: {
    IconBtnWithTip
  },
  props: {
    idx: {
      type: Number,
      default: 1
    },
    track: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    bgColor () {
      return Color(this.track.color).lighten(0.5).rgb().string();
    }
  }
});
</script>

<style scoped>

</style>
