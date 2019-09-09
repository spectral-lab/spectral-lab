import { storiesOf } from '@storybook/vue';
import PianoRollLayout from '../renderer/components/piano-roll-zone/PianoRollLayout';

storiesOf('PianoRollLayout', module)
  .add('view', () => ({
    components: { PianoRollLayout },
    template: `
      <piano-roll-layout>
        <template #ruler>
          <div style="{ position: absolute; background: blue; width: 100%; height: 100%; }" />
        </template>
        <template #midi-keyboard>
          <div style="{ position: absolute; background-color: red; width:100%; height: 100%; }" />
        </template>  
        <template #note-display>
          <div style="{ position: absolute; background-color: green; width:100%; height: 100%; }" />
        </template>
        <template #automation-display>
          <div style="{ position: absolute; background-color: yellow; width:100%; height: 100%; }" />
        </template>
      </piano-roll-layout>`
  }));
