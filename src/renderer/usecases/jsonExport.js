// @flow
import fs from 'fs-extra';
import { remote } from 'electron';
import { Clip, Track } from '../store/models';
const { dialog } = remote;

export const exportClipAsJson = async (id: string): Promise<void> => {
  const path = await dialog.showSaveDialog({
    message: 'Export clip as'
  });
  if (path) fs.writeJson(path, Clip.query().whereId(id).withAllRecursive().first());
};

export const exportTrackAsJson = async (id: string): Promise<void> => {
  const path = await dialog.showSaveDialog({
    message: 'Export track as'
  });
  if (path) fs.writeJson(path, Track.query().whereId(id).withAllRecursive().first());
};
