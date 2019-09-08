import VuexORM from '@vuex-orm/core';
import * as models from './models';
import { APP_ID, PIANO_ROLL_ID, SONG_ID } from '../../constants/ids';
import uid from 'uid';
import hotkeys from 'hotkeys-js';
import * as modelTypes from '../../constants/model-types';

export const makeMandatory = field => val => {
  if (val == null) throw new Error(`Mandatory Field: ${field} cannot be ${val}`);
  return val;
};

export const setHotkeysScope = zoneName => {
  hotkeys.setScope(zoneName);
  return zoneName;
};

export const initDatabase = () => {
  const database = new VuexORM.Database();
  Object.values(modelTypes).forEach(modelName => database.register(models[modelName]));
  return database;
};

export const instanciateModels = () => {
  const trackId = uid();
  models.App.insert({
    data: {
      id: APP_ID
    }
  });
  models.Song.insert({
    data: {
      id: SONG_ID
    }
  });
  models.Track.insert({
    data: {
      id: trackId,
      selected: true,
      songId: SONG_ID
    }
  });
  models.Clip.insert({
    data: {
      id: uid(),
      selected: true,
      trackId,
      name: 'spectrogram'
    }
  });
  models.PianoRoll.insert({
    data: {
      id: PIANO_ROLL_ID,
      appId: APP_ID
    }
  });
  models.Arrangement.insert({
    data: {
      id: uid(),
      appId: APP_ID
    }
  });
};
