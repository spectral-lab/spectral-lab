// @flow
import { insertTrack, getSelectedTrackIds } from '../interactors/Track';
import { insertDefaultClip } from '../interactors/Clip';
import { INSPECT } from '../../constants/dialog-types';
import { CLIP } from '../../constants/model-types';
import { openDialog } from '../interactors/Dialog';

export const track = () => {
  insertTrack();
};

export const clip = async () => {
  const trackIds = getSelectedTrackIds();
  if (!trackIds.length) return;
  const clipId = await insertDefaultClip(trackIds[0]);
  openDialog(INSPECT, { contextType: CLIP, contextId: clipId });
};
