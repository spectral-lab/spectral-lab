// @flow
import { remote } from 'electron';

export const setSpectrogramForClip = async (id: string) => {
  const paths = await showOpenDialog();
  if (!paths) return;
  if (!paths.length) return;
  const path = paths[0];
  console.log(path);
};

export const showOpenDialog = async () => {
  return remote.dialog.showOpenDialog({
    message: 'Choose an audio file for the selected clip ',
    properties: ['openFile', 'createDirectory'],
    filters: [
      { name: 'Audio', extensions: ['wav', 'aiff', 'mp3'] }
    ]
  });
};
