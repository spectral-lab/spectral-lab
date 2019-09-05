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
        {{ target.type }}
      </v-card-title>
      <v-card-text>
        <div
          v-for="key in propertiesToShow"
          :key="key"
        >
          <v-text-field
            @change="handleChange(key, $event)"
            :value="template[key].format(target[key])"
            :label="template[key].label"
            :suffix="template[key].suffix"
            :hint="template[key].hint"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// @flow
import { userInputTemplates } from '../../templates/user-input';

export default {
  props: {
    target: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      template: userInputTemplates
    };
  },
  computed: {
    propertiesToShow () {
      if (!this.target) return [];
      return Object.keys(this.target).filter(key => userInputTemplates[key]);
    }
  },
  methods: {
    handleChange (key: string, input: string) {
      const newVal = userInputTemplates[key].parse(input);
      this.$emit('change', { target: this.target, key, newVal });
    },
    handleVisibility (newVal) {
      this.$emit('visibility', newVal);
    }
  }
};
</script>

<style scoped>
</style>
