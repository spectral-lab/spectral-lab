// @flow
import fs from 'fs-extra';
import { remote } from 'electron';
import { noCase } from 'change-case';
import * as models from '../models';
const { dialog } = remote;

export const exportJson = async (type: string, id: string): Promise<void> => {
  const model = models[type];
  if (!model) throw new Error('Invalid model type');
  const path = await dialog.showSaveDialog({
    message: `Export ${noCase(type)} as`
  });
  if (path) fs.writeJson(path, model.query().whereId(id).withAllRecursive().first());
};
