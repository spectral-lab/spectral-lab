// @flow
import { Track } from '../../store/models';
import uid from 'uid';
import { SONG_ID } from '../../../constants/ids';
export const insertTrack = (data?: Object): void => {
  Track.insert({
    data: Object.assign({ id: uid(), songId: SONG_ID }, data)
  });
};

export const getSelectedTrackIds = (): string[] => {
  return Track.query().where('selected', true).get().map(track => track.id);
};

export const selectTrack = async (id: string, ev: Object) => {
  if (ev.metaKey || ev.shiftKey) {
    await addSelection(id);
    return;
  }
  await Promise.all([deselectOtherTracks(id), addSelection(id)]);
};

const addSelection = async (trackId: string) => {
  await Track.update({
    where: trackId,
    data: { selected: true }
  });
};

const deselectOtherTracks = async (id: string) => {
  await Track.update({
    where: track => track.selected && track.id !== id,
    data: { selected: false }
  });
};
