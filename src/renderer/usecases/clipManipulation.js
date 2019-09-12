// @flow
import { getSelectedTrackIds } from '../interactors/Track';
import { setTrackId } from '../interactors/Clip';

export const moveClipToSelectedTrack = async (id: string) => {
  const trackIds = getSelectedTrackIds();
  if (!trackIds.length) return;
  await setTrackId(id, trackIds[0]);
};
