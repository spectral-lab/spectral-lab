<template>
  <div>
    <inspect-dialog
      @visibility="handleVisibility"
      @change="handleChange"
      :title="title"
      :visible="visible"
      :templates="templates"
    />
  </div>
</template>

<script>
// @flow
import InspectDialog from './InspectDialog';
import * as models from '../../store/models';
import Vue from 'vue';
import { templateGenerator } from '../../modules';
import type { InspectDialogTemplate } from '../../modules/defs/TemplateGenerator';
export default Vue.extend({
  components: {
    InspectDialog
  },
  data () {
    return {
      visible: false,
      target: null
    };
  },
  computed: {
    title (): string {
      if (this.target && this.target.type) return this.target.type;
      return 'Inspect';
    },
    templates (): InspectDialogTemplate[] {
      if (!this.target) return [];
      return templateGenerator.makeInspectDialog(this.target);
    }
  },
  methods: {
    open ({ context, id }) {
      if (this.visible === false) this.visible = true;
      this.target = models[context].query().whereId(id).first();
    },
    close () {
      if (this.visible === true) this.visible = false;
    },
    handleVisibility (val) {
      if (this.visible !== val) this.visible = val;
    },
    handleChange (data) {
      models[this.target.type].update({
        where: this.target.id,
        data
      });
    }
  }
});
</script>

<style scoped>

</style>
