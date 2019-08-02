<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <v-btn
        v-on="on"
        @click="emitClickEvent"
        small
        fab
        color="primary"
        class="elevation-0"
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
