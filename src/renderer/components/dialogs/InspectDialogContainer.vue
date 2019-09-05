<template>
  <div>
    <inspect-dialog
      @visibility="handleVisibility"
      :visible="visible"
      :target="target"
    />
  </div>
</template>

<script>
import InspectDialog from './InspectDialog';
import * as models from '../../store/models';
export default {
  components: {
    InspectDialog
  },
  data () {
    return {
      visible: false,
      target: null
    };
  },
  methods: {
    open ({ type, context, id }) {
      if (this.visible === false) this.visible = true;
      this.target = models[context].query().whereId(id).first();
    },
    close () {
      if (this.visible === true) this.visible = false;
    },
    handleVisibility (val) {
      if (this.visible !== val) this.visible = val;
    }
  }
};
</script>

<style scoped>

</style>
