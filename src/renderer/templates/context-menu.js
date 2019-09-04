// @flow
import { eventHub } from '../modules';
import { CLIP } from '../../constants/model-types';

export type Option = {
  label: string,
  click(id: string): void
}

export const contextMenuTemplate = {
  [CLIP]: [
    {
      label: 'Inspect',
      click ({ id }) {
        eventHub.$emit('inspect', {
          type: CLIP,
          id
        });
      }
    }
  ]
};

export default contextMenuTemplate;
