// @flow
import { INSPECT } from '../../../constants/dialog-types';
import { TRACK } from '../../../constants/model-types';
import { exportJson } from '../../usecases/jsonExport';
import type { Option } from './types';
import { openDialog } from '../../interactors/Dialog';

export const track: Option[] = [
  {
    label: 'Inspect',
    click ({ id }) {
      openDialog(INSPECT, {
        contextType: TRACK,
        contextId: id
      });
    }
  },
  {
    label: 'Export as JSON',
    async click ({ id }) {
      await exportJson(TRACK, id);
    }
  }
];
