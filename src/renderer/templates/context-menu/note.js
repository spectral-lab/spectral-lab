// @flow
import { exportJson } from '../../usecases/jsonExport';
import { NOTE } from '../../../constants/model-types';
import type { Option } from './types';

export const note: Option[] = [
  {
    label: 'Export as JSON',
    async click ({ id }) {
      await exportJson(NOTE, id);
    }
  }
];
