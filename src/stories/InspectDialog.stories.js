// @flow
// $FlowFixMe
import InspectDialog from '../renderer/components/dialogs/InspectDialog';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import mockClip from '../../test/data/json/mockClip';
import { TemplateGenerator } from '../renderer/modules/defs/TemplateGenerator';
import userInputTemplates from '../renderer/templates/user-input';

const templates = TemplateGenerator({ userInputTemplates }).makeInspectDialog(mockClip);

storiesOf('InspectDialog', module)
  .add('view', () => ({
    components: { InspectDialog },
    data: () => ({ templates }),
    methods: { action: action('value-changed') },
    template: `<inspect-dialog :templates="templates" :visible="true" @change="action"/>`
  }));
