<template>
  <v-card
    :color="bgColor"
    class="track-header-panel"
    flat
  >
    <v-card-title primary-title>
      <h3>
        {{ idx + 1 }} {{ track.name }}
      </h3>
    </v-card-title>
    <v-card-actions>
      <v-layout row>
        <v-spacer />
        <icon-btn-with-tip
          @click="handleClick"
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
import { TRACK } from '../../../constants/model-types';
import { INSPECT } from '../../../constants/dialog-types';
import { dialogEventHub } from '../../modules';

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
      return Color(this.track.color).darken(0.5).rgb().string();
    }
  },
  methods: {
    handleClick () {
      dialogEventHub.emit(null, {
        type: INSPECT,
        context: TRACK,
        id: this.track.id
      });
    }
  }
});
</script>

<style scoped>

</style>
