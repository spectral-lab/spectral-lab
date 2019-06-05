<template>
  <v-layout row>
    <v-toolbar color="grey darken-3" height=160>
        <v-layout column>
          <v-layout row class="mb-3">
            <v-spacer />
              Spectrogram
            <v-spacer />
          </v-layout>
          <v-layout row>
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn fab large v-on="on" color="primary" class="elevation-0">
                <v-icon>build</v-icon>
              </v-btn>
            </template>
            <span>Make spectrogram of the source audio.</span>
          </v-tooltip>
          <v-btn fab large color="primary" class="elevation-0">
            <v-icon>delete_forever</v-icon>
          </v-btn>
          </v-layout>
        </v-layout>
    </v-toolbar>
    <v-toolbar color="grey darken-3" height=160>
      <v-layout column>
        <v-layout row class="mb-3">
          <v-spacer />
            Midi
          <v-spacer />
        </v-layout>
        <v-layout raw>
          <v-btn fab large color="primary" class="elevation-0">
            <v-icon>build</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-toolbar>
  </v-layout>
</template>

<script>
</script>

<style scoped>
</style>