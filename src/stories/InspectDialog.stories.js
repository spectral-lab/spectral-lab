import InspectDialog from '../renderer/components/dialogs/InspectDialog';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import mockClip from '../../test/data/json/mockClip';

mockClip.editableProperties = ['name', 'duration', 'offsetTime'];

storiesOf('InspectDialog', module)
  .add('view', () => ({
    components: { InspectDialog },
    data: () => ({ clip: mockClip }),
    methods: { action: action('value-changed') },
    template: `<inspect-dialog :target="clip" :show="true" @change="action"/>`
  }));
