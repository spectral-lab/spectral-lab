import { Transport } from 'tone';

const colors = {
  'C': '#4e61d8',
  'C#': '#8064c6',
  'Db': '#8064c6',
  'D': '#a542b1',
  'D#': '#ed3883',
  'Eb': '#ed3883',
  'E': '#f75839',
  'F': '#f7943d',
  'F#': '#f6be37',
  'Gb': '#f6be37',
  'G': '#d1c12e',
  'G#': '#95c631',
  'Ab': '#95c631',
  'A': '#4bb250',
  'A#': '#45b5a1',
  'Bb': '#45b5a1',
  'B': '#4598b6'
};

class Note {
  /**
   *  Notes manage both the visual element and trigger the synth
   */
  constructor (noteDescription, displayOptions) {
    /**
     *  Note stats
     */
    this.noteOn = Transport.toSeconds(noteDescription.time);
    this.duration = Transport.toSeconds(noteDescription.duration);
    this.noteOff = this.noteOn + this.duration;

    // parse the name from the octave, and add it as a class
    var noteName = noteDescription.note.match(/^([a-g]{1}[b|#]{0,1})[0-9]+$/i)[1];

    /**
     * The notes color
     */
    this.color = colors[noteName];

    /**
     *  the note name
     */
    this.note = noteDescription.note;

    /**
     *  the note velocity
     */
    this.velocity = noteDescription.velocity;

    /**
     *  MIDI note number
     */
    this.midiNote = noteDescription.midiNote;

    /**
     * If the note is triggered or not
     */
    this._triggered = false;

    /**
     *  place it on the screen
     */
    var top = (displayOptions.max - displayOptions.min) * (1 - (this.midiNote - displayOptions.min) / (displayOptions.max - displayOptions.min));
    top *= displayOptions.noteHeight - 2;

    // dimensions
    this.top = top;
    this.left = this.noteOn * displayOptions.pixelsPerSecond;
    this.width = (this.duration * displayOptions.pixelsPerSecond) - 2;
    this.width = Math.max(this.width, 3);
    this.height = displayOptions.noteHeight - 2;
  };

  /**
   *  trigger the attack
   */
  triggerAttack (time) {
    this._triggered = true;
  };

  /**
   *  trigger the release
   */
  triggerRelease (time) {
    this._triggered = false;
  };

  triggerAttackRelease (duration, time) {
    duration = Transport.toSeconds(duration);
    this.needsUpdate = true;
    this._triggered = true;
    setTimeout(function () {
      this._triggered = false;
      this.needsUpdate = true;
    }.bind(this), duration * 1000);
  };

  /**
   *  Display the element
   */
  draw (context) {
    context.beginPath();
    if (this._triggered) {
      context.fillStyle = 'black';
    } else {
      context.fillStyle = this.color;
    }
    context.fillRect(this.left * 2, this.top * 2, this.width * 2, this.height * 2);
  };

  /**
   *  trigger the release
   */
  dispose (time) {
    Transport.cancel(this.noteOnId);
    Transport.cancel(this.noteOffId);
    this.element.remove();
    this.element = null;
  };
}

export default Note;
