import uid from 'uid';
import range from 'lodash/range';
import { ticksPerBeat } from '../../../constants/defaults';
import { generateBeatData } from '../Beat';

export const generateBarData = (offsetTime: number): Object => ({
  id: uid(),
  offsetTime,
  beats: range(4).map(i => generateBeatData(i * ticksPerBeat))
});
