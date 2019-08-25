import { Clip } from '../store/models';
import { exportClip } from '../modules/helpers/midiExportUtils';
import { remote } from 'electron';
const { dialog } = remote;

export const exportSelectedClips = async (): Promise<void> => {
  const exportDir = await dialog.showOpenDialog({
    message: 'Choose a directory where you export',
    properties: ['openDirectory', 'createDirectory']
  });
  if (!exportDir) return;
  const selectedClips = Clip.query().where('selected', true).withAllRecursive().get();
  await Promise.all(selectedClips.map(clip => exportClip(clip, exportDir[0])));
  console.log('All done');
};
