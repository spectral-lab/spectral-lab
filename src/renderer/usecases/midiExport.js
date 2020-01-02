// @flow
import { Clip } from '../models';
import { remote } from 'electron';
import { midiWriter } from '../modules/container';
const { dialog } = remote;

export const exportSelectedClips = async (): Promise<void> => {
  const { filePaths } = await dialog.showOpenDialog({
    message: 'Choose a directory where you export',
    properties: ['openDirectory', 'createDirectory']
  });
  if (filePaths === []) return;
  const selectedClips = Clip.query().where('selected', true).withAllRecursive().get();
  await Promise.all(selectedClips.map(clip => midiWriter.exportClip(clip, filePaths[0])));
  console.log('All clips are exported successfully');
};
