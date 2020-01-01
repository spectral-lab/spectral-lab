// @flow
import { Track } from '../../models';

export const getSelectedTrackIds = (): string[] => {
  return Track.query().where('selected', true).get().map(track => track.id);
};
