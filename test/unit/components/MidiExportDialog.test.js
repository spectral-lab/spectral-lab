import { shallowMount } from '@vue/test-utils';
import MidiExportDialog from '../../../src/renderer/components/dialogs/MidiExportDialog';
import Vue from 'vue';
import vuetify from 'vuetify';

Vue.use(vuetify);

describe('Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MidiExportDialog);
  });
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
