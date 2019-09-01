import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import ElasticDivStack from '../renderer/components/misc/ElasticDivStack';

storiesOf('ElasticDivStack', module)
  .add('with Hello World', () => ({
    components: { ElasticDivStack },
    template: `
      <elastic-div-stack>
        <template #upper>Hello</template>
        <template #lower>World</template>
      </elastic-div-stack>`,
    methods: { action: action('clicked') }
  }));
