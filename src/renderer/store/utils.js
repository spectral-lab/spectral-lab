import VuexORM from '@vuex-orm/core';
import * as models from './models';
import uid from 'uid';

export const makeMandatory = field => val => {
  if (val == null) throw new Error(`Mandatory Field: ${field} cannot be ${val}`);
  return val;
};

export const initDatabase = () => {
  const database = new VuexORM.Database();
  Object.values(models).forEach(model => database.register(model));
  return database;
};

export const instanciateModels = () => {
  const songId = uid();
  const trackId = uid();
  models.App.insert({
    data: {
      id: uid()
    }
  });
  models.Song.insert({
    data: {
      id: songId
    }
  });
  models.Track.insert({
    data: {
      id: trackId,
      songId
    }
  });
  models.MidiClip.insert({
    data: {
      id: uid(),
      trackId
    }
  });
};
