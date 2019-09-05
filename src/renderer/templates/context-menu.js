// @flow
import { eventHub } from '../modules';
import { CLIP } from '../../constants/model-types';
import { DIALOG } from '../../constants/event-types';
import { INSPECT } from '../../constants/dialog-types';

export type Option = {
  label: string,
  click(id: string): void
}

export const contextMenuTemplate = {
  [CLIP]: [
    {
      label: 'Inspect',
      click ({ id }) {
        eventHub.$emit(DIALOG, null, {
          type: INSPECT,
          context: CLIP,
          id
        });
      }
    }
  ]
};

export default contextMenuTemplate;
