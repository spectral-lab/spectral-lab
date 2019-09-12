// @flow
import { dialogEventHub } from '../modules';
import { CLIP, NOTE, TRACK } from '../../constants/model-types';
import { INSPECT } from '../../constants/dialog-types';
import { exportJson } from '../usecases/jsonExport';
import { moveToSelectedTrack } from '../interactors/Clip';

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
      label: 'Export Clip as JSON',
      async click ({ id }) {
        await exportJson(CLIP, id);
      }
    },
    {
      label: 'Move to Selected Track',
      async click ({ id }) {
        await moveToSelectedTrack(id);
      }
    }
  ],
  [TRACK]: [
    {
      label: 'Export Track as JSON',
      async click ({ id }) {
        await exportJson(TRACK, id);
      }
    }
  ],
  [NOTE]: [
    {
      label: 'Export Note as JSON',
      async click ({ id }) {
        await exportJson(NOTE, id);
      }
    }
  ]
};

export default contextMenuTemplates;
