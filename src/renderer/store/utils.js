import VuexORM from '@vuex-orm/core';
import * as models from './models';
import { APP_ID } from '../constants/ids';
import uid from 'uid';
import {
  NOTE_ON, NOTE_OFF, MODULATION,
  NOTE, SPECTROGRAM, AUDIO_BUFFER, CLIP,
  TRACK, SONG, APP
} from '../constants/model-types';

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
      id: APP_ID
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
  models.Clip.insert({
    data: {
      id: uid(),
      selected: true,
      trackId
    }
  });
};

export const getAbsoluteTime = modelInstance => {
  return getPath(modelInstance).reduce((time, eachInstance) => {
    if (eachInstance.offsetTime) return time + eachInstance.offsetTime;
    return time;
  }, 0);
};

export const getParent = child => {
  switch (child.type) {
    case NOTE_ON: return models.Note.find(child.noteId);
    case NOTE_OFF: return models.Note.find(child.noteId);
    case MODULATION: return models.Note.find(child.noteId);
    case NOTE: return models.Clip.find(child.clipId);
    case AUDIO_BUFFER: return models.Clip.find(child.clipId);
    case SPECTROGRAM: return models.AudioBuffer.find(child.audioBufferId);
    case CLIP: return models.Track.find(child.trackId);
    case TRACK: return models.Song.find(child.songId);
    case SONG: return null;
    case APP: return null;
    default: throw new Error('Cannot get parent: Invalid type');
  }
};
/**
 * @param modelInstance
 * @returns {object[]}
 */
export const getPath = modelInstance => {
  const parent = getParent(modelInstance);
  if (parent === null) return [modelInstance];
  return [...getPath(parent), modelInstance];
};
