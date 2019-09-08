<template>
  <div class="track-header-panel">
    <div
      :style="{backgroundColor: labelColor}"
      class="color-label"
    />
    <div
      :style="{backgroundColor: bgColor}"
      class="panel-content"
    >
      <v-card-title>
        <h3>
          {{ idx + 1 }}. {{ track.name }}
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
    </div>
  </div>
</template>

<script>
// @flow
import IconBtnWithTip from '../misc/IconBtnWithTip';
import Color from 'color';
import Vue from 'vue';
import { TRACK } from '../../../constants/model-types';

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
    labelColor () {
      return Color(this.track.color).darken(0.5).rgb().string();
    },
    bgColor () {
      return 'rgb(30,30,30)';
    }
  },
  methods: {
    handleClick (ev) {
      this.$emit('click', ev, {
        type: 'setting',
        id: this.track.id,
        context: TRACK
      });
    }
  }
});
</script>

<style scoped>
  .track-header-panel {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .color-label {
    width: 25px;
    height: 100%;
  }
  .panel-content {
    height: 100%;
    flex: 1 10 auto;
  }
</style>
