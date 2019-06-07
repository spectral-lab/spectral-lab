<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn fab large v-on="on" color="primary" class="elevation-0">
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
  }
};
</script>