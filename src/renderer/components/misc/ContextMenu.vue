<template>
  <div>
    <vue-context
      ref="menu"
      @close="handleClose"
      class="menu"
    >
      <li
        v-for="option in template"
        :key="option.label"
      >
        <a
          @click.prevent="option.click(payload)"
          href="#"
        >
          {{ option.label }}
        </a>
      </li>
    </vue-context>
  </div>
</template>

<script>
// @flow
import { VueContext } from 'vue-context';
import * as templates from '../../templates/context-menu';
import type { Option } from '../../templates/context-menu';
import { contextMenuEventHub } from '../../modules';
import { camelCase } from 'change-case';
export default {
  components: {
    VueContext
  },
  data () {
    return {
      context: null,
      payload: null
    };
  },
  computed: {
    template (): Option[] {
      if (!this.context) return [];
      return templates[camelCase(this.context)];
    }
  },
  mounted () {
    contextMenuEventHub.addListener((ev, payload: { context: string, id: string }) => {
      this.context = payload.context;
      this.payload = payload;
      this.$refs.menu.open(ev);
    });
  },
  methods: {
    handleClose () {
      this.context = null;
      this.payload = null;
    }
  }
};
</script>

<style scoped>
  .menu {
    font-family: Roboto, sans-serif;
    box-shadow: 5px 5px 25px -8px rgba(0, 0, 0,1);
  }
</style>
