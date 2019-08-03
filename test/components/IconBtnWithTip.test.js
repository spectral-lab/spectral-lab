import { shallowMount } from '@vue/test-utils';
import IconBtnWithTip from '../../src/renderer/components/IconBtnWithTip';
import Vue from 'vue';
import vuetify from 'vuetify';

Vue.use(vuetify);

describe('Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IconBtnWithTip, {
      propsData: {
        icon: 'dashboard',
        tip: 'hello world'
      }
    });
  });
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
