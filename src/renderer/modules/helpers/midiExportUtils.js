import { remote } from 'electron';
import fs from 'fs-extra';
import { Clip } from '../../store/models';
import JZZ from 'jzz';
import jzzMidiSmf from 'jzz-midi-smf';
import { OutputManager } from '../outputManager';
const { dialog } = remote;
jzzMidiSmf(JZZ);

export const exportSelectedClips = async () => {
  const exportDir = await dialog.showOpenDialog({
    message: 'Choose a directory where you export',
    properties: ['openDirectory', 'createDirectory']
  });
  if (!exportDir) return;
  const selectedClips = Clip.query().where('selected', true).withAllRecursive().get();
  await Promise.all(selectedClips.map(clip => exportClip(clip, exportDir)));
  console.log('all done');
};

export const exportClip = async (clip, dir) => {
  const name = clip.name || clip.id;
  const path = `${dir}/${name}.mid`;
  console.log(`exporting clip ${name}`);
  const { ticksPerBeat } = clip.parent.parent;
  const smf = new JZZ.MIDI.SMF(1, ticksPerBeat);
  smf.push(clipToMTrk(clip));
  await fs.writeFile(path, smf.dump(), 'binary');
  console.log(`Success: ${path} has been exported!`);
};

const clipToMTrk = clip => {
  const MTrk = new JZZ.MIDI.SMF.MTrk();
  const offlineOutputManager = new OutputManager({
    midiOutput: {
      send: (message, timestamp) => MTrk.add(timestamp, JZZ.MIDI(message))
    }
  });
  const { bpm } = clip.parent.parent;
  MTrk
    .add(0, JZZ.MIDI.smfSeqName(clip.name || clip.id))
    .add(0, JZZ.MIDI.smfBPM(bpm))
    .add(clip.duration, JZZ.MIDI.smfEndOfTrack());
  clip.notes.forEach(note => {
    const noteControl = offlineOutputManager.noteOn(note.noteOn, note.offsetTime);
    note.modulations.forEach(modulation => noteControl.modulate(modulation, note.offsetTime + modulation.offsetTime));
    noteControl.noteOff(note.noteOff, note.offsetTime + note.noteOff.offsetTime);
  });
  debugger;
  return MTrk;
};
