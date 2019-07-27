<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <v-btn
        small
        fab
        color="primary"
        class="elevation-0"
        v-on="on"
        @click="emitClickEvent"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    icon: String,
    tip: String
  },
  methods: {
    emitClickEvent () {
      this.$emit('click');
    }
  }
};
</script>
