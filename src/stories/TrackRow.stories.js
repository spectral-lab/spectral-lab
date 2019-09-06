import TrackRow from '../renderer/components/arrangement-zone/TrackRow';
import { storiesOf } from '@storybook/vue';
import mockTrack from '../../test/data/json/mockTrack';
import { action } from '@storybook/addon-actions';

storiesOf('TrackRow', module)
  .add('view', () => ({
    components: { TrackRow },
    data: () => ({ track: mockTrack }),
    methods: { action: action('clicked') },
    template: `<TrackRow @click="action" :track="track" :idx="23" />`
  }))
  .add('with template', () => ({
    components: { TrackRow },
    data: () => ({ track: mockTrack }),
    methods: { action: action('clicked') },
    template: `
        <track-row @click="action" :track="track" :idx="23">
            <template slot="clips"><h1>Here come clips!</h1></template>
        </track-row>`
  }));
