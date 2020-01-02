// @flow
// $FlowFixMe
import ExtractNotesDialog from '../renderer/components/dialogs/ExtractNotesDialog';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

storiesOf('ExtractNotesDialog', module)
  .add('view', () => ({
    components: { ExtractNotesDialog },
    methods: { action: action('clicked') },
    template: `<extract-notes-dialog :visible="true" @click="action"/>`
  }));
