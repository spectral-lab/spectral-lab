// @flow
import { insertTrack, getSelectedTrackIds } from '../interactors/Track';
import { insertDefaultClip } from '../interactors/Clip';
import { dialogEventHub } from '../modules/container';
import { INSPECT } from '../../constants/dialog-types';
import { CLIP } from '../../constants/model-types';

export const track = () => {
  insertTrack();
};

export const clip = async () => {
  const trackIds = getSelectedTrackIds();
  if (!trackIds.length) return;
  const clipId = await insertDefaultClip(trackIds[0]);
  dialogEventHub.emit(null, { type: INSPECT, context: CLIP, id: clipId });
};
