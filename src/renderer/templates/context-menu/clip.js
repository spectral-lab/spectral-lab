// @flow
import { dialogEventHub } from '../../modules';
import { INSPECT } from '../../../constants/dialog-types';
import { CLIP } from '../../../constants/model-types';
import { exportJson } from '../../usecases/jsonExport';
import { deleteClip, moveToSelectedTrack } from '../../interactors/Clip';
import type { Option } from './types';

export const clip: Option[] = [
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
    label: 'Delete Clip',
    async click ({ id }) {
      await deleteClip(id);
    }
  },
  {
    label: 'Move to Selected Track',
    async click ({ id }) {
      await moveToSelectedTrack(id);
    }
  }
];
