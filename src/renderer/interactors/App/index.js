import { App } from '../../store/models';
import { APP_ID } from '../../../constants/ids';

export const createApp = (): void => {
  App.insert({
    data: {
      id: APP_ID
    }
  });
};
