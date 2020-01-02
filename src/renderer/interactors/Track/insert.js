// @flow
import { Track } from '../../models';
import uid from 'uid';
import { SONG_ID } from '../../../constants/ids';

export const insertTrack = (data?: Object): Promise<any> => {
  return Track.insert({
    data: Object.assign({ id: uid(), songId: SONG_ID }, data)
  });
};
