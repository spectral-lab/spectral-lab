<template>
  <v-dialog
    v-model="showDialog"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline accent darken-2"
        primary-title
      >
        MIDI Export
      </v-card-title>

      <v-card-text>
        <v-radio-group
          v-model="target"
          style="margin-top: 0"
          mandatory
        >
          <v-radio
            :value="ALL_TRACKS"
            label="All Tracks"
          />
          <v-radio
            :value="SELECTED_TRACKS"
            label="Selected Tracks"
          />
          <v-radio
            :value="ALL_CLIPS"
            label="All Clips"
          />
          <v-radio
            :value="SELECTED_CLIPS"
            label="Selected Clips"
          />
        </v-radio-group>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="handleClick"
          color="accent darken-1"
        >
          Export
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ALL_CLIPS, ALL_TRACKS, SELECTED_TRACKS, SELECTED_CLIPS } from '../constants/midi-export-options';

export default {
  data () {
    return {
      showDialog: true,
      target: ALL_TRACKS,
      ALL_CLIPS,
      ALL_TRACKS,
      SELECTED_CLIPS,
      SELECTED_TRACKS
    };
  },
  methods: {
    show () {
      if (this.showDialog === false) this.showDialog = true;
    },
    hide () {
      if (this.showDialog === true) this.showDialog = false;
    },
    handleClick () {
      this.hide();
      this.$emit('click', this.target);
    }
  }
};
</script>

<style scoped>

</style>
