// @flow
// $FlowFixMe
import GridVerticalLines from '../renderer/components/grid/GridVerticalLines';
// $FlowFixMe
import GridVerticalLinesLayout from '../renderer/components/grid/GridVerticalLinesLayout';
import { storiesOf } from '@storybook/vue';
import uid from 'uid';
import { ticksPerBeat } from '../constants/defaults';
import flatMap from 'lodash/flatMap';
import { Bar, Beat } from '../renderer/models';
import mockClip from '../../test/data/json/mockClip';
const bars = [
  {
    id: uid(),
    absoluteTime: ticksPerBeat * 3,
    beats: [
      {
        id: uid(),
        absoluteTime: ticksPerBeat * 3
      },
      {
        id: uid(),
        absoluteTime: ticksPerBeat * 4
      }
    ]
  },
  {
    id: uid(),
    absoluteTime: ticksPerBeat * 5,
    beats: [
      {
        id: uid(),
        absoluteTime: ticksPerBeat * 5
      },
      {
        id: uid(),
        absoluteTime: ticksPerBeat * 6
      }
    ]
  }
];

const clip: any = {
  id: uid(),
  offsetTime: ticksPerBeat * 3,
  absoluteTime: ticksPerBeat * 3,
  duration: ticksPerBeat * 4,
  bars
};

clip.beats = flatMap<Bar[], Beat>(clip.bars, bar => bar.beats);
mockClip.bars = mockClip.bars
  .map(bar => Object.assign({}, bar, {
    absoluteTime: bar.offsetTime,
    beats: bar.beats
      .map(beat => Object.assign({}, beat, { absoluteTime: beat.offsetTime + bar.offsetTime }))
  }));
mockClip.beats = flatMap<Bar[], Beat>(mockClip.bars, bar => bar.beats);

storiesOf('GridVerticalLines', module)
  .add('draw 2 lines', () => ({
    components: { GridVerticalLines },
    data: () => ({ clip }),
    template: `
      <grid-vertical-lines
        :sourceItems="clip.bars[0].beats"
        :duration="clip.duration"
        :startTime="clip.offsetTime"
      />`
  }))
  .add('show beats and bars', () => ({
    components: { GridVerticalLinesLayout },
    data: () => ({ clips: [clip] }),
    template: `
      <grid-vertical-lines-layout
        :clips="clips"
        :duration="clips[0].duration"
        :startTime="clips[0].absoluteTime"
      />`
  }))
  .add('show mockClip partially', () => ({
    components: { GridVerticalLines },
    data: () => ({ clip: mockClip }),
    template: `
      <grid-vertical-lines
        :sourceItems="clip.bars[0].beats"
        :duration="clip.duration"
        :startTime="clip.offsetTime"
      />`
  }))
  .add('show mockClip', () => ({
    components: { GridVerticalLinesLayout },
    data: () => ({ clips: [mockClip] }),
    template: `
      <grid-vertical-lines-layout
        :clips="clips"
        :duration="clips[0].duration"
        :startTime="clips[0].offsetTime"
      />`
  }));
