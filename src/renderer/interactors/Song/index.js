import { SONG_ID } from '../../../constants/ids';
import { Song } from '../../store/models';

export const getSongData = ():Song => {
  return Song.query().whereId(SONG_ID).first();
};
