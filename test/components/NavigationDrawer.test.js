import { shallowMount } from '@vue/test-utils';
import NavigationDrawer from '../../src/renderer/components/NavigationDrawer';
import menuTemplate from '../../src/renderer/constants/menu';
import Vue from 'vue';
import vuetify from 'vuetify';

Vue.use(vuetify);

describe('Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(NavigationDrawer, {
      propsData: {
        menuTemplate
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
