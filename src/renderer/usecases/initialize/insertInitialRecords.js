// @flow
import uid from 'uid';
import {
  createApp, createPianoRoll, createArrangement,
  createSong, insertTrack, insertDefaultClip
} from '../../interactors';
import { createDialog } from '../../interactors/Dialog';

export const insertInitialRecords = (): void => {
  const trackId = uid();
  createApp();
  createPianoRoll();
  createArrangement();
  createDialog();
  createSong();
  insertTrack({ id: trackId, selected: true });
  insertDefaultClip(trackId, { selected: true });
};
