// @flow
import { clamp, mapValues } from 'lodash';
import { NAME, OFFSET_TIME } from '../../constants/model-properties';

// =====================================================================================================================
// types
export type UserInputTemplate = {
  label: string,
  type: string,
  suffix: string,
  hint: string,
  format (val: any): string,
  parse (input: string): any
}

export interface IUserInputTemplates {
  [key: string]: UserInputTemplate
}

// =====================================================================================================================

const defaultTemplate: UserInputTemplate = {
  label: '',
  type: 'text',
  suffix: '',
  hint: '',
  format: String,
  parse: v => v
};

const assignDefault = (templates): IUserInputTemplates => {
  return mapValues(
    templates,
    template => Object.assign({}, defaultTemplate, template)
  );
};

// =====================================================================================================================

export const userInputTemplates: IUserInputTemplates = assignDefault({
  [NAME]: {
    label: 'name'
  },
  [OFFSET_TIME]: {
    label: 'offset time',
    type: 'number',
    suffix: 'tick',
    hint: 'relative time position from its parent',
    parse (input) {
      return Math.max(parseInt(input), 0);
    }
  }
});

export default userInputTemplates;
