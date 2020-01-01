<template>
  <div>
    <v-layout row>
      <v-toolbar color="grey darken-3">
        <v-layout
          row
          align-center
        >
          <v-flex>
            <mouse-mode-selector-container />
          </v-flex>
          <v-flex>
            <extract-notes />
          </v-flex>
        </v-layout>
      </v-toolbar>
    </v-layout>
  </div>
</template>

<script>
import MouseModeSelectorContainer from './MouseModeSelectorContainer';
import ExtractNotes from './ExtractNotes';

export default {
  components: {
    MouseModeSelectorContainer,
    ExtractNotes
  }
};
</script>
