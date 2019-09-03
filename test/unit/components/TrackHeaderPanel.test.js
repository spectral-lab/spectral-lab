import { shallowMount } from '@vue/test-utils';
import TrackHeaderPanel from '../../../src/renderer/components/arrangement-zone/TrackHeaderPanel';
import Vue from 'vue';
import vuetify from 'vuetify';
import mockTrack from '../../data/json/mockTrack.json';

Vue.use(vuetify);

describe('Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TrackHeaderPanel, {
      propsData: {
        idx: 2,
        track: mockTrack
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
