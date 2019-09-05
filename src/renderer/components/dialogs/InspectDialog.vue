<template>
  <v-dialog
    :value="show"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline accent darken-2"
        primary-title
      >
        Clip
      </v-card-title>
      <v-card-text>
        <div
          v-for="key in properties"
          :key="key"
        >
          <v-text-field
            @change="handleChange(key, $event)"
            :value="target[key]"
            :label="key"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// @flow
export default {
  props: {
    target: {
      type: Object,
      default: null
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    properties () {
      if (!this.target) return [];
      return this.target.editableProperties;
    }
  },
  methods: {
    handleChange (key: string, newVal: string) {
      this.$emit('change', { target: this.target, key, newVal });
    }
  }
};
</script>

<style scoped>
</style>
