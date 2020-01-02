// @flow
import { Arrangement } from '../../models';
import { APP_ID, ARRANGEMENT_ID } from '../../../constants/ids';

export const createArrangement = (): Promise<any> => {
  return Arrangement.insert({
    data: {
      id: ARRANGEMENT_ID,
      appId: APP_ID
    }
  });
};
