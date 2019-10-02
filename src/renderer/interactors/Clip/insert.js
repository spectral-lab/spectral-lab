// @flow
import uid from 'uid';
import { Clip } from '../../store/models';
import range from 'lodash/range';
import { generateBarData } from '../Bar';
import { ticksPerBar } from '../../../constants/defaults';

export const insertDefaultClip = async (parentTrackId: string, data?: Object): Promise<string> => {
  const clipId = data && data.id ? data.id : uid();
  await Clip.insert({
    data: Object.assign({
      id: clipId,
      trackId: parentTrackId,
      bars: range(4).map(i => generateBarData(i * ticksPerBar))
    }, data)
  });
  return clipId;
};
