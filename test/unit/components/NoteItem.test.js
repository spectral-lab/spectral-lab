import { shallowMount } from '@vue/test-utils';
import NoteItem from '../../../src/renderer/components/piano-roll-zone/NoteItem';
import mockNote from '../../data/mockNote';
import mockPitchTransition from '../../data/json/mockPitchTransition';

mockNote.pitchTransition = mockPitchTransition;

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(NoteItem, {
      propsData: {
        note: mockNote,
        totalTicks: 10000
      }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  test('renders correctly', () => {
    const wrapper = shallowMount(NoteItem, {
      propsData: {
        note: mockNote,
        totalTicks: 10000
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
