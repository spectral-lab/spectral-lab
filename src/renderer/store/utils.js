// @flow
import VuexORM from '@vuex-orm/core';
import * as models from '../models';
import hotkeys from 'hotkeys-js';
import * as modelTypes from '../../constants/model-types';

export const makeMandatory = (field: string) => (val: any): any => {
  if (val == null) {
    throw new Error(`Mandatory Field: ${field} cannot be ${val}`);
  }
  return val;
};

export const setHotkeysScope = (zoneName: string): string => {
  hotkeys.setScope(zoneName);
  return zoneName;
};

export const initDatabase = (): any => {
  const database = new VuexORM.Database();
  Object.values(modelTypes).forEach((modelName: any) =>
    database.register(models[modelName])
  );
  return database;
};
