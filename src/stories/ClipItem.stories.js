import ClipItem from '../renderer/components/arrangement-zone/ClipItem';
import { storiesOf } from '@storybook/vue';
import mockClip from '../../test/data/json/mockClip';
import { action } from '@storybook/addon-actions';

storiesOf('ClipItem', module)
  .add('is selected', () => ({
    components: { ClipItem },
    data: () => ({ clip: Object.assign({}, mockClip, { selected: true }) }),
    methods: {
      handleDblClick: action('double clicked'),
      handleClick: action('clicked'),
      handleContextMenu: action('context-menu')
    },
    template:
      `<clip-item
        :clip="clip"
        @click="handleClick"
        @dblclick="handleDblClick"
        @contextmenu="handleContextMenu"
      />`
  }))
  .add('is not selected', () => ({
    components: { ClipItem },
    data: () => ({ clip: Object.assign({}, mockClip, { selected: false }) }),
    methods: {
      handleDblClick: action('double clicked'),
      handleClick: action('clicked'),
      handleContextMenu: action('context-menu')
    },
    template:
      `<clip-item
        :clip="clip"
        @click="handleClick"
        @dblclick="handleDblClick"
        @contextmenu="handleContextMenu"
      />`
  }));
