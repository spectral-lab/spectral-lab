// @flow
import { getSelectedTrackIds } from '../Track';
import { Clip } from '../../models';

export const moveToSelectedTrack = async (id: string) => {
  const trackIds = getSelectedTrackIds();
  if (!trackIds.length) return;
  await setTrackId(id, trackIds[0]);
};

export const setTrackId = async (clipId: string, trackId: string) => {
  await Clip.update({
    where: clipId,
    data: {
      trackId: trackId
    }
  });
};
