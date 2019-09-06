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
        {{ title }}
      </v-card-title>
      <v-card-text>
        <div
          v-for="template in templates"
          :key="template.id"
        >
          <v-text-field
            @change="handleChange(template.id, template.parse($event))"
            :value="template.value"
            :label="template.label"
            :suffix="template.suffix"
            :hint="template.hint"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// @flow
import Vue from 'vue';
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: 'Inspect'
    },
    templates: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange (key: string, newVal: string) {
      this.$emit('change', { [key]: newVal });
    },
    handleVisibility (newVal) {
      this.$emit('visibility', newVal);
    }
  }
});
</script>

<style scoped>
</style>
