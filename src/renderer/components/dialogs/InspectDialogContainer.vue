<template>
  <div>
    <inspect-dialog
      :show="showDialog"
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
      showDialog: false,
      target: null
    };
  },
  methods: {
    show ({ type, context, id }) {
      if (this.showDialog === false) this.showDialog = true;
      this.target = models[context].query().whereId(id).first();
    },
    hide () {
      if (this.showDialog === true) this.showDialog = false;
    }
  }
};
</script>

<style scoped>

</style>
