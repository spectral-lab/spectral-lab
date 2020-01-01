<template>
  <v-dialog
    :value="visible"
    @input="handleVisibility"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline accent darken-2"
        primary-title
      >
        Extract Notes
      </v-card-title>

      <v-card-text>
        <v-radio-group
          v-model="degree"
          style="margin-top: 0"
          mandatory
          label="line shape"
        >
          <template v-for="key in keysOfLineShapes">
            <v-radio
              :value="lineShapes[key].degree"
              :label="lineShapes[key].label"
            />
          </template>
        </v-radio-group>
        <v-slider
          v-model="sensitivity"
          thumb-label
          ticks
          max="10"
          min="1"
          label="sensitivity"
          color="grey"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="handleClick"
          color="accent darken-1"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { LineShapes } from '../../../constants/extract-notes-options';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      degree: 0,
      sensitivity: 5,
      lineShapes: LineShapes
    };
  },
  computed: {
    keysOfLineShapes () {
      return Object.keys(this.lineShapes);
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', { degree: this.degree, sensitivity: this.sensitivity });
    },
    handleVisibility (newVal) {
      this.$emit('visibility', newVal);
    }
  }
};
</script>

<style scoped>

</style>
