// @flow
import { App } from '../../models';
import { APP_ID } from '../../../constants/ids';

export const createApp = (): Promise<any> => {
  return App.insert({
    data: {
      id: APP_ID
    }
  });
};
