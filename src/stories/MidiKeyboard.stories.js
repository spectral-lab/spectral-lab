import { storiesOf } from '@storybook/vue';
import MidiKeyboard from '../renderer/components/piano-roll-zone/MidiKeyboard';

storiesOf('MidiKeyboard', module)
  .add('view', () => ({
    components: { MidiKeyboard },
    template: `<midi-keyboard/>`
  }));
