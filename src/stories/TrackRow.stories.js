import TrackRow from '../renderer/components/arrangement-zone/TrackRow';
import { storiesOf } from '@storybook/vue';
import mockTrack from '../../test/data/json/mockTrack';

storiesOf('TrackRow', module)
  .add('view', () => ({
    components: { TrackRow },
    data: () => ({ track: mockTrack }),
    template: `<TrackRow :track="track" :idx="23" />`
  }))
  .add('with template', () => ({
    components: { TrackRow },
    data: () => ({ track: mockTrack }),
    template: `
        <track-row :track="track" :idx="23">
            <template slot="clips"><h1>Here come clips!</h1></template>
        </track-row>`
  }));
