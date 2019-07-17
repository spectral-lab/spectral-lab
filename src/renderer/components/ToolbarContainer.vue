<template>
    <div>
        <toolbar
                @mouse-mode="handleMouseMode"
        />
    </div>
</template>

<script>
import Toolbar from './Toolbar';
import { App } from '../store/models';
export default {
  computed: {
    appId () {
      return App.query().last().id;
    }
  },
  methods: {
    handleMouseMode (m) {
      App.update({
        where: this.appId,
        data: {
          mouseMode: m
        }
      });
    }
  },
  components: {
    Toolbar
  }
};
</script>
<style scoped>

</style>
