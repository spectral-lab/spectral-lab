import ClipItem from '../renderer/components/arrangement-zone/ClipItem';
import { storiesOf } from '@storybook/vue';
import mockClip from '../../test/data/json/mockClip';

storiesOf('ClipItem', module)
  .add('view', () => ({
    components: { ClipItem },
    data: () => ({ clip: mockClip }),
    template: `<clip-item :clip="clip" />`
  }));
