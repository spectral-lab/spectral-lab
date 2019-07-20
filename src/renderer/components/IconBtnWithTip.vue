<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn small fab v-on="on" @click="emitClickEvent" color="primary" class="elevation-0">
        <v-icon>{{icon}}</v-icon>
      </v-btn>
    </template>
    <span>{{tip}}</span>
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
