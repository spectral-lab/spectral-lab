// @flow
import { SONG_ID } from '../../../constants/ids';
import { Song } from '../../models';

export const getSongData = (): Song => {
  return Song.query().whereId(SONG_ID).first();
};
export const createSong = (): Promise<any> => {
  return Song.insert({
    data: {
      id: SONG_ID
    }
  });
};
