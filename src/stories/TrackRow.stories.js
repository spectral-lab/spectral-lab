import TrackRow from '../renderer/components/arrangement-zone/TrackRow';
import { storiesOf } from '@storybook/vue';
import mockTrack from '../../test/data/mockTrack';

storiesOf('TrackRow', module)
  .add('view', () => ({
    components: { TrackRow },
    data: () => ({ track: mockTrack }),
    template: `<TrackRow :track="track" :idx="23" />`
  }));
