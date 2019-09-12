// @flow
import { Track } from '../../store/models';
import uid from 'uid';
import { SONG_ID } from '../../../constants/ids';
export const createTrack = (data?: Object): void => {
  Track.insert({
    data: Object.assign({ id: uid(), songId: SONG_ID }, data)
  });
};

export const getSelectedTrackIds = (): string[] => {
  return Track.query().where('selected', true).get().map(track => track.id);
};
