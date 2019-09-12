// @flow
import { createTrack, getSelectedTrackIds } from '../interactors/Track';
import { createDefaultClip } from '../interactors/Clip';
import { dialogEventHub } from '../modules';
import { INSPECT } from '../../constants/dialog-types';
import { CLIP } from '../../constants/model-types';

export const track = () => {
  createTrack();
};

export const clip = async () => {
  const trackIds = getSelectedTrackIds();
  if (!trackIds.length) return;
  const clipId = await createDefaultClip(trackIds[0]);
  dialogEventHub.emit(null, { type: INSPECT, context: CLIP, id: clipId });
};
