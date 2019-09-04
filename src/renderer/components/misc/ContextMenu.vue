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
import templates from '../../templates/context-menu';
import type { Option } from '../../templates/context-menu';
export default {
  components: {
    VueContext
  },
  data () {
    return {
      type: null,
      payload: null
    };
  },
  computed: {
    template (): Option[] {
      if (!this.type) return [];
      return templates[this.type];
    }
  },
  mounted () {
    this.$eventHub.$on('contextmenu', (ev, payload: { type: string, id: string }) => {
      this.type = payload.type;
      this.payload = payload;
      this.$refs.menu.open(ev);
    });
  },
  methods: {
    handleClose () {
      this.type = null;
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
