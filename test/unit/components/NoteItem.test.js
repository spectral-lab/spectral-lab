import { shallowMount } from '@vue/test-utils';
import NoteItem from '../../../src/renderer/components/NoteItem';
import mockPitchTransition from '../../data/mockPitchTransition';

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(NoteItem, {
      propsData: {
        pitchTransition: mockPitchTransition,
        totalTicks: 10000
      }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  test('renders correctly', () => {
    const wrapper = shallowMount(NoteItem, {
      propsData: {
        pitchTransition: mockPitchTransition,
        totalTicks: 10000
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
