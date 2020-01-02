<template>
  <div>
    <inspect-dialog
      @visibility="close"
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
import * as models from '../../models';
import Vue from 'vue';
import { templateGenerator } from '../../modules/container';
import type { InspectDialogTemplate } from '../../modules/definitions/TemplateGenerator';
import { closeDialog, getDialogInDisplay, getDialogState } from '../../interactors/Dialog';
import { INSPECT } from '../../../constants/dialog-types';
export default Vue.extend({
  components: {
    InspectDialog
  },
  computed: {
    visible () {
      return getDialogInDisplay() === INSPECT;
    },
    target () {
      const { contextId, contextType } = getDialogState();
      return {
        type: contextType,
        id: contextId
      };
    },
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
    close () {
      if (this.visible) closeDialog();
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
