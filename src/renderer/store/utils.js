// @flow
import VuexORM from '@vuex-orm/core';
import * as modelsToBeRegistered from '../models/modelsToBeRegistered';
import hotkeys from 'hotkeys-js';

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
  Object.values(modelsToBeRegistered).forEach((model: any) => {
    database.register(model);
  });
  return database;
};
