import { remote } from 'electron';
import fs from 'fs-extra';
import { Clip } from '../../store/models';
import JZZ from 'jzz';
import jzzMidiSmf from 'jzz-midi-smf';
import { OutputManager } from '../outputManager';
import { processClip } from '../outputManager/utils';
const { dialog } = remote;
jzzMidiSmf(JZZ);

type MTrk = JZZ.MIDI.SMF.MTrk;

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

export const exportClip = async (clip: Clip, dir: string) => {
  if (clip.notes === []) return;
  const name = clip.name || clip.id;
  const path = `${dir}/${name}.mid`;
  console.log(`Exporting clip ${name}`);
  const { ticksPerBeat } = clip.parent.parent;
  const smf = new JZZ.MIDI.SMF(1, ticksPerBeat);
  smf.push(clipToMTrk(clip));
  await fs.writeFile(path, smf.dump(), 'binary');
  console.log(`Success: ${path} has been exported!`);
};

const clipToMTrk = (clip: Clip): MTrk => {
  const MTrk = new JZZ.MIDI.SMF.MTrk();
  const { bpm } = clip.parent.parent;
  MTrk
    .add(0, JZZ.MIDI.smfSeqName(clip.name || clip.id))
    .add(0, JZZ.MIDI.smfBPM(bpm))
    .add(clip.duration, JZZ.MIDI.smfEndOfTrack());
  const offlineOutputManager = new OutputManager({
    send: (message, timestamp) => MTrk.add(timestamp, JZZ.MIDI(message))
  });
  processClip(clip, offlineOutputManager);
  return MTrk;
};
