import MidiExportDialog from '../renderer/components/dialogs/MidiExportDialog';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import mockClip from '../../test/data/json/mockClip';

mockClip.editableProperties = ['name', 'duration', 'offsetTime'];

storiesOf('MidiExportDialog', module)
  .add('view', () => ({
    components: { MidiExportDialog },
    data: () => ({ clip: mockClip }),
    methods: { action: action('clicked') },
    template: `<midi-export-dialog :visible="true" @click="action"/>`
  }));
