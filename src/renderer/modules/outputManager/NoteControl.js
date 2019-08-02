import '../../typedef';

/**
 * @typedef NoteControl
 * @property {NoteControl.modulate} modulate
 * @property {NoteControl.noteOff} noteOff
 */
class NoteControl {
  constructor (modulateCb, noteOffCb) {
    this.released = false;
    this.modulateCb = modulateCb;
    this.noteOffCb = noteOffCb;
  }

  /**
   * @typedef NoteControl.modulate
   * @param  {Modulation} modulation
   * @param  {number} timestamp default 0
   */
  modulate (modulation, timestamp = 0) {
    if (this.released) return;
    this.modulateCb(modulation, timestamp);
  }

  /**
   * @typedef NoteControl.noteOff
   * @param  {NoteOff} noteOff
   * @param  {number} timestamp default 0
   */
  noteOff (noteOff, timestamp = 0) {
    if (this.released) return;
    this.released = true;
    this.noteOffCb(noteOff, timestamp);
  }
};

export default NoteControl;
