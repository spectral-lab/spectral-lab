import '../../typedef';
// eslint-disable-next-line no-unused-vars
import { Modulation, NoteOff } from '../../store/models';

type ModulateCb = (modulate: Modulation, timestamp: number) => any;
type NoteOffCb = (noteOff: NoteOff, timestamp: number) => any;

export default class NoteControl {
  private _released: boolean;

  private _modulateCb: ModulateCb;

  private _noteOffCb: NoteOffCb;

  constructor (modulateCb: ModulateCb, noteOffCb: NoteOffCb) {
    this._released = false;
    this._modulateCb = modulateCb;
    this._noteOffCb = noteOffCb;
  }

  /**
   * @typedef NoteControl.modulate
   * @param  {Modulation} modulation
   * @param  {number} timestamp default 0
   */
  modulate (modulation: Modulation, timestamp: number = 0): void {
    if (this._released) return;
    this._modulateCb(modulation, timestamp);
  }

  /**
   * @typedef NoteControl.noteOff
   * @param  {NoteOff} noteOff
   * @param  {number} timestamp default 0
   */
  noteOff (noteOff: NoteOff, timestamp: number = 0): void {
    if (this._released) return;
    this._released = true;
    this._noteOffCb(noteOff, timestamp);
  }
}
