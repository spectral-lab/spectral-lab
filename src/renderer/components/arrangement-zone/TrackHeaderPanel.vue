<template>
  <div
    @click="handleClickPanel"
    @contextmenu="handleContextMenu"
    class="track-header-panel"
  >
    <div
      :style="{backgroundColor: labelColor}"
      class="color-label"
    />
    <div
      :style="{backgroundColor: bgColor}"
      class="panel-content"
    >
      <v-card-title>
        <h3 :style="{color: titleColor}">
          {{ idx + 1 }}. {{ track.name }}
        </h3>
      </v-card-title>
      <v-card-actions>
        <v-layout row>
          <v-spacer />
          <icon-btn-with-tip
            @click="handleClickSetting"
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
import IconBtnWithTip from '../utils/IconBtnWithTip';
import Color from 'color';
import Vue from 'vue';
import { TRACK } from '../../../constants/model-types';
import { CLICK, CONTEXT_MENU } from '../../../constants/event-types';

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
      if (this.track.selected) return 'rgb(200,200,200)';
      return 'rgb(35,36,39)';
    },
    titleColor () {
      if (this.track.selected) return 'black';
      return 'white';
    }
  },
  methods: {
    handleClickPanel (ev) {
      if (ev.target.matches('button,i')) return;
      this.$emit(CLICK, ev, {
        type: 'panel',
        id: this.track.id,
        context: TRACK
      });
    },
    handleContextMenu (ev) {
      if (ev.target.matches('button,i')) return;
      this.$emit(CONTEXT_MENU, ev, {
        type: 'panel',
        id: this.track.id,
        context: TRACK
      });
    },
    handleClickSetting (ev) {
      this.$emit(CLICK, ev, {
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
