// @flow
import type { ISmfGenerator } from './SmfGenerator';
import fs from 'fs-extra';
import { Clip } from '../store/models';

export interface IMidiWriter {
  exportClip(clip: Clip, dir: string): Promise<void>
}

export class MidiWriter implements IMidiWriter {
  _smfGenerator: ISmfGenerator;

  constructor (smfGenerator: ISmfGenerator) {
    this._smfGenerator = smfGenerator;
  }

  async exportClip (clip: Clip, dir: string) {
    const smf = this._smfGenerator.processClip(clip);
    const name = clip.name || clip.id;
    const path = `${dir}/${name}.mid`;
    await fs.writeFile(path, smf.dump(), 'binary');
  }
}
