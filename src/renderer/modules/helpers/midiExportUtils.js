// @flow
import { remote } from 'electron';
import fs from 'fs-extra';
import { Clip } from '../../store/models';
import JZZ from 'jzz';
import jzzMidiSmf from 'jzz-midi-smf';
import { OutputManager } from '../outputManager';
// import { processClip } from '../outputManager/utils';
const { dialog } = remote;
jzzMidiSmf(JZZ);

export type MTrk = JZZ.MIDI.SMF.MTrk;
export type SMF = JZZ.MIDI.SMF;

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
  // const offlineOutputManager = new OutputManager({
  //   send: (message, timestamp) => MTrk.add(timestamp, JZZ.MIDI(message))
  // });
  // processClip(clip, offlineOutputManager);
  return MTrk;
};
