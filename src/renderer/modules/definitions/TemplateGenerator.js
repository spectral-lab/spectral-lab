// @flow
import type { IUserInputTemplates, UserInputTemplate } from '../../templates/user-input';

export type InspectDialogTemplate = UserInputTemplate & {
  id: string,
  value: string,
}

export interface ITemplateGenerator {
  makeInspectDialog (target: any): InspectDialogTemplate[]
}

export const TemplateGenerator = ({ userInputTemplates }: { userInputTemplates: IUserInputTemplates }): ITemplateGenerator => ({
  makeInspectDialog (target) {
    if (!userInputTemplates) throw new Error(`Invalid value of userInputTemplates: ${userInputTemplates}.`);
    const propertiesToShow = Object.keys(target).filter(key => userInputTemplates[key]);
    return propertiesToShow.map(key => ({
      id: key,
      value: userInputTemplates[key].format(target[key]),
      ...userInputTemplates[key]
    }));
  }
});
