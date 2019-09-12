// @flow
import uid from 'uid';
import {
  createApp, createPianoRoll, createArrangement,
  createSong, insertTrack, insertDefaultClip
} from '../../interactors';

export const insertInitialRecords = (): void => {
  const trackId = uid();
  createApp();
  createPianoRoll();
  createArrangement();
  createSong();
  insertTrack({ id: trackId, selected: true });
  insertDefaultClip(trackId, { selected: true });
};
