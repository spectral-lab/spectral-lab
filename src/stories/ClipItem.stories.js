import ClipItem from '../renderer/components/arrangement-zone/ClipItem';
import { storiesOf } from '@storybook/vue';
import mockClip from '../../test/data/json/mockClip';
import { action } from '@storybook/addon-actions';

storiesOf('ClipItem', module)
  .add('view', () => ({
    components: { ClipItem },
    data: () => ({ clip: mockClip }),
    methods: {
      handleDblClick: action('double clicked'),
      handleContextMenu: action('context-menu')
    },
    template: `<clip-item :clip="clip" @dblclick="handleDblClick" @contextmenu="handleContextMenu" />`
  }));
