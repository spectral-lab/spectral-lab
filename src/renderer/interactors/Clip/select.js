// @flow
import { Clip } from '../../models';

export const selectClip = (id: string, ev: Object): Promise<any> => {
  if (ev.metaKey || ev.shiftKey) return addSelection(id);
  return Promise.all([deselectClipsExcept(id), addSelection(id)]);
};

const addSelection = async (clipId: string) => {
  await Clip.update({
    where: clipId,
    data: { selected: true }
  });
};

const deselectClipsExcept = async (id: string) => {
  await Clip.update({
    where: clip => clip.selected && clip.id !== id,
    data: { selected: false }
  });
};
