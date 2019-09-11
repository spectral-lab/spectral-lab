// @flow
import uid from 'uid';
import {
  createApp, createPianoRoll, createArrangement,
  createSong, createTrack, createDefaultClip
} from '../../interactors';

export const insertInitialRecords = (): void => {
  const trackId = uid();
  createApp();
  createPianoRoll();
  createArrangement();
  createSong();
  createTrack({ id: trackId, selected: true });
  createDefaultClip(trackId, { selected: true });
};
