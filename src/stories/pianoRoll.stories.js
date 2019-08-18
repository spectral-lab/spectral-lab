import { storiesOf } from '@storybook/vue';
import MidiKeyboard from '../renderer/components/MidiKeyboard';
import NoteItem from '../renderer/components/NoteItem';
import mockPitchTransition from '../../test/data/mockPitchTransition';

storiesOf('MidiKeyboard', module)
  .add('view', () => ({
    components: { MidiKeyboard },
    template: `<midi-keyboard/>`
  }));

storiesOf('NoteItem', module)
  .add('view', () => ({
    components: { NoteItem },
    data: () => ({ pitchTransition: mockPitchTransition }),
    template: `<svg><note-item :pitch-transition="pitchTransition" :total-ticks="1800"/></svg>`
  }));
