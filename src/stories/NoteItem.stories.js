import { storiesOf } from '@storybook/vue';
import NoteItem from '../renderer/components/piano-roll-zone/NoteItem';
import mockNote from '../../test/data/json/mockNote';
import { pitchTransition } from '../renderer/utils/helpers/transition';

mockNote.pitchTransition = pitchTransition(mockNote);

storiesOf('NoteItem', module)
  .add('looks like', () => ({
    components: { NoteItem },
    data: () => ({ note: mockNote }),
    template: `<svg><note-item :note="note" :total-ticks="1800"/></svg>`
  }))
  .add('is selected', () => ({
    components: { NoteItem },
    data: () => ({ note: Object.assign({}, mockNote, { selected: true }) }),
    template: `<svg><note-item :note="note" :total-ticks="1800"/></svg>`
  }))
  .add('is edited', () => ({
    components: { NoteItem },
    data: () => ({ note: mockNote }),
    template: `<svg><note-item :note="note" :isEdited="true" :total-ticks="1800"/></svg>`
  }));
