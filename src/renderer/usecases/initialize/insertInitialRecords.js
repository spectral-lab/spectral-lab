// @flow
import uid from 'uid';
import {
  createApp, createPianoRoll, createArrangement,
  createSong, insertTrack, insertDefaultClip
} from '../../interactors';
import { createDialog } from '../../interactors/Dialog';
import { getStore } from '../../store';

export const insertInitialRecords = async () => {
  getStore();
  const trackId = uid();
  await createApp();
  await Promise.all([
    createPianoRoll(),
    createArrangement(),
    createDialog()
  ]);
  await createSong();
  await insertTrack({ id: trackId, selected: true });
  await insertDefaultClip(trackId, { selected: true });
};
