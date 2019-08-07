<template>
  <v-btn-toggle
    @change="emitMouseMode"
    mandatory
  >
    <v-btn class="mouse-pointer">
      <v-icon flat>
        fa-mouse-pointer
      </v-icon>
    </v-btn>
    <v-btn>
      <v-icon flat>
        fa-pen
      </v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import * as MOUSE_MODES from '../../constants/mouse-modes';
export default {
  methods: {
    emitMouseMode (modeIdx) {
      switch (modeIdx) {
        case 0:
          this.$emit('mouse-mode', MOUSE_MODES.SELECT);
          break;
        case 1:
          this.$emit('mouse-mode', MOUSE_MODES.PEN);
          break;
      }
    }
  }
};
</script>

<style scoped>

</style>
