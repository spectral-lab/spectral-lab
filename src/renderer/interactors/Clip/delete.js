// @flow
import { Clip } from '../../store/models';

export const deleteClip = async (id: string) => {
  await Clip.delete({
    where: id
  });
};
