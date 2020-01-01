// @flow
import { Track } from '../../models';

export const selectTrack = (id: string, ev: Object): Promise<any> => {
  if (ev.metaKey || ev.shiftKey) return addSelection(id);
  return Promise.all([deselectTracksExcept(id), addSelection(id)]);
};

const addSelection = async (trackId: string) => {
  await Track.update({
    where: trackId,
    data: { selected: true }
  });
};

const deselectTracksExcept = async (id: string) => {
  await Track.update({
    where: track => track.selected && track.id !== id,
    data: { selected: false }
  });
};
