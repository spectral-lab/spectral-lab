<template>
  <div>
    <v-navigation-drawer
      v-model="showDrawer"
      dark
      temporary
      absolute
    >
      <div
        :style="{height: `${parseInt(titleBarHeight) - 4}px`}"
        class="spacer"
      />
      <v-list dense>
        <v-list-group
          v-for="menuItem in menuTemplate"
          :key="menuItem.label"
          no-action
        >
          <template #activator>
            <v-list-tile>
              <v-list-tile-title>{{ menuItem.label }}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-card color="grey darken-2">
            <v-list-tile
              v-for="subItem in menuItem.subMenu"
              :key="subItem"
              @click="handleClick(subItem)"
            >
              <v-list-tile-title>
                {{ subItem }}
              </v-list-tile-title>
            </v-list-tile>
          </v-card>
        </v-list-group>
      </v-list>
      <div class="spacer" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { titleBarHeight } from '../constants/layout';

export default {
  props: {
    menuTemplate: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showDrawer: false,
      titleBarHeight
    };
  },
  mounted () {
    this.listenMouseMove();
  },
  methods: {
    handleClick (type) {
      this.$emit('click', type);
    },
    hide () {
      if (this.showDrawer) this.showDrawer = false;
    },
    listenMouseMove () {
      //  If the mouse position keeps near the left edge 300 ms or longer, "showDrawer" is set true.
      let isNearLeftEdge = false;
      let waiting = false;
      document.addEventListener('mousemove', (ev) => {
        isNearLeftEdge = ev.pageX < 60;
        if (isNearLeftEdge) {
          if (!waiting) {
            setTimeout(() => {
              if (isNearLeftEdge) this.showDrawer = true;
              waiting = false;
            }, 300);
            waiting = true;
          }
        }
      });
      document.addEventListener('mouseleave', () => {
        isNearLeftEdge = false;
      });
    }
  }
};
</script>

<style scoped>
  .spacer {
    height: 50px;
  }
</style>
