import TrackRow from '../renderer/components/arrangement-zone/TrackRow';
import ClipItemLayout from '../renderer/components/arrangement-zone/ClipItemLayout';
import { storiesOf } from '@storybook/vue';
import mockTrack from '../../test/data/json/mockTrack';
import mockClip from '../../test/data/json/mockClip';
import { action } from '@storybook/addon-actions';
import { songDuration } from '../constants/defaults';

storiesOf('TrackRow', module)
  .add('view', () => ({
    components: { TrackRow },
    data: () => ({ track: Object.assign({}, mockTrack, { selected: false }) }),
    methods: { action: action('clicked') },
    template: `<TrackRow @click="action" :track="track" :idx="23" />`
  }))
  .add('is selected', () => ({
    components: { TrackRow },
    data: () => ({ track: Object.assign({}, mockTrack, { selected: true }) }),
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
  }))
  .add('with a clip', () => ({
    components: { TrackRow, ClipItemLayout },
    data: () => ({ track: mockTrack, clips: [mockClip], songDuration }),
    methods: {
      handleClick: action('clicked'),
      handleDblClick: action('double clicked'),
      handleContextMenu: action('context menu')
    },
    template: `
          <track-row @click="handleClick" :track="track" :idx="23">
              <template slot="clips">
                <clip-item-layout
                    @click="handleClick"
                    @dblclick="handleDblClick"
                    @contextmenu="handleContextMenu"
                    :clips="clips"
                    :songDuration="songDuration"
                />
              </template>
          </track-row>`
  }));
