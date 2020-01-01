import { storiesOf } from '@storybook/vue';
import ElasticDivStack from '../renderer/components/utils/ElasticDivStack';

storiesOf('ElasticDivStack', module)
  .add('with Hello World', () => ({
    components: { ElasticDivStack },
    template: `
      <elastic-div-stack>
        <template #upper>Hello</template>
        <template #lower>World</template>
      </elastic-div-stack>`
  }));
