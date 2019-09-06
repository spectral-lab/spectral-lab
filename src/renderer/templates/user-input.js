// @flow
import mapValues from 'lodash/mapValues';
import { COLOR, DURATION, NAME, OFFSET_TIME } from '../../constants/model-properties';
import { noCase } from 'change-case';
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
    label: noCase(NAME)
  },
  [OFFSET_TIME]: {
    label: noCase(OFFSET_TIME),
    type: 'number',
    suffix: 'tick',
    parse (input) {
      return Math.max(parseInt(input), 0);
    }
  },
  [DURATION]: {
    label: noCase(DURATION),
    type: 'number',
    suffix: 'tick',
    parse (input) {
      return Math.max(parseInt(input), 0);
    }
  },
  [COLOR]: {
    label: noCase(COLOR)
  }
});

export default userInputTemplates;
