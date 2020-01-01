<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <v-btn
        v-on="on"
        @click="emitClickEvent"
        :color="color"
        small
        fab
        class="elevation-0"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tip }}</span>
  </v-tooltip>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  props: {
    icon: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    emitClickEvent (ev) {
      this.$emit('click', ev);
    }
  }
});
</script>
