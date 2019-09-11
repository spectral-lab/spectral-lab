// @flow
import VuexORM from '@vuex-orm/core';
import * as models from './models';
import { APP_ID, PIANO_ROLL_ID, SONG_ID } from '../../constants/ids';
import uid from 'uid';
import hotkeys from 'hotkeys-js';
import * as modelTypes from '../../constants/model-types';
import { beatsPerBar, ticksPerBeat } from '../../constants/defaults';
import range from 'lodash/range';

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

export const instanciateModels = (): void => {
  const trackId = uid();
  const clipId = uid();
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
  models.Clip.insert({
    data: {
      id: clipId,
      name: 'spectrogram',
      selected: true,
      trackId,
      duration: 4 * ticksPerBeat * beatsPerBar
    }
  });
  range(4).forEach(i => {
    const barId = uid();
    models.Bar.insert({
      data: {
        id: barId,
        clipId,
        offsetTime: i * ticksPerBeat * beatsPerBar,
        duration: ticksPerBeat * beatsPerBar
      }
    });
    range(4).forEach(j => {
      models.Beat.insert({
        data: {
          id: uid(),
          barId,
          offsetTime: j * ticksPerBeat
        }
      });
    });
  });
};
