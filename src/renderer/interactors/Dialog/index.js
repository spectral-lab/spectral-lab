import { Dialog } from '../../models';
import { APP_ID, DIALOG_ID } from '../../../constants/ids';

export const createDialog = () => {
  Dialog.insert({
    data: {
      id: DIALOG_ID,
      appId: APP_ID
    }
  });
};
