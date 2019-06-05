<template>
  <v-navigation-drawer
        permanent
        clipped
        fixed
        app
        class="mt-4"
      >
    <v-list>
      <v-toolbar color="transparent" flat>
        <v-toolbar-title>Track List</v-toolbar-title>
        <v-spacer />
        <v-btn color="accent" icon>
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card color="grey darken-2">
          <v-card-title>
            <v-icon>waves</v-icon>
            <v-card-title>Track 1</v-card-title>
          </v-card-title>
      </v-card>
      <v-card color="grey darken-2">
          <v-card-title>
            <v-icon>waves</v-icon>
            <v-card-title>Track 2</v-card-title>
          </v-card-title>
      </v-card>
    </v-list>
  </v-navigation-drawer> 
</template>

<script>

</script>

<style scoped>

</style>
