// @flow
import { dialogEventHub } from '../modules';
import { CLIP, NOTE, TRACK } from '../../constants/model-types';
import { INSPECT } from '../../constants/dialog-types';
import { exportClipAsJson, exportNoteAsJson, exportTrackAsJson } from '../usecases/jsonExport';

// =====================================================================================================================

export type Option = {
  label: string,
  click({ context: string, id: string }): void
}

export interface IContextMenuTemplates {
  [key: string]: Option[]
}

// =====================================================================================================================

// $FlowFixMe
export const contextMenuTemplates: IContextMenuTemplates = {
  [CLIP]: [
    {
      label: 'Inspect',
      click ({ id }) {
        dialogEventHub.emit(null, {
          type: INSPECT,
          context: CLIP,
          id
        });
      }
    },
    {
      label: 'Export as text',
      async click ({ id }) {
        await exportClipAsJson(id);
      }
    }
  ],
  [TRACK]: [
    {
      label: 'Export as text',
      async click ({ id }) {
        await exportTrackAsJson(id);
      }
    }
  ],
  [NOTE]: [
    {
      label: 'Export as text',
      async click ({ id }) {
        await exportNoteAsJson(id);
      }
    }
  ]
};

export default contextMenuTemplates;
