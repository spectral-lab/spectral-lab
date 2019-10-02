// @flow
import { Clip } from '../../store/models';
import uid from 'uid';
import range from 'lodash/range';
import { ticksPerBar } from '../../../constants/defaults';
import { getSelectedTrackIds } from '../Track';
import { generateBarData } from '../Bar';

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

export const moveToSelectedTrack = async (id: string) => {
  const trackIds = getSelectedTrackIds();
  if (!trackIds.length) return;
  await setTrackId(id, trackIds[0]);
};

export const deleteClip = async (id: string) => {
  await Clip.delete({
    where: id
  });
};

export const setTrackId = async (clipId: string, trackId: string) => {
  await Clip.update({
    where: clipId,
    data: {
      trackId: trackId
    }
  });
};

export const selectClip = async (id: string, ev: Object) => {
  if (!(ev.metaKey || ev.shiftKey)) {
    await Clip.update({
      where: clip => clip.selected && clip.id !== id,
      data: { selected: false }
    });
  }
  await Clip.update({
    where: id,
    data: { selected: true }
  });
};
