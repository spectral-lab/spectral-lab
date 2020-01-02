// @flow
import { Dialog } from '../../models';
import { APP_ID, DIALOG_ID } from '../../../constants/ids';
import * as DialogTypes from '../../../constants/dialog-types';

export const createDialog = async () => {
  await Dialog.insert({
    data: {
      id: DIALOG_ID,
      appId: APP_ID
    }
  });
};

export const updateDialog = (data: any): Promise<any> => {
  return Dialog.update({
    where: DIALOG_ID,
    data
  });
};

export const getDialogState = () => {
  return Dialog.query().whereId(DIALOG_ID).first();
};

export const getDialogInDisplay = () => {
  return getDialogState().inDisplay;
};

export const openDialog = (options: { type: $Values<typeof DialogTypes>, context?: string, id?: string }): Promise<any> => {
  return updateDialog({
    inDisplay: options
  });
};
