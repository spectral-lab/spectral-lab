// @flow
import { Clip } from '../../models';

export const deleteClip = async (id: string) => {
  await Clip.delete({
    where: id
  });
};
