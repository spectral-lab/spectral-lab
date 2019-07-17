import { Model } from '@vuex-orm/core';
import { NOTE_ON, NOTE_OFF, MODULATION } from '../constants/note-action-types';
import { makeMandatory } from './utils';
import { bpm, beatsInBar, ticksPerBeat } from '../constants/defaults';
import { SELECT } from '../constants/mouse-modes';

export class NoteOn extends Model {
  static entity = 'noteOns';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      noteId: this.attr(null),
      type: this.string(NOTE_ON),
      time: this.number(0), // in tick
      noteNumber: this.number(60),
      noteOnVelocity: this.number(0.5), // from 0.0 to 1.0.
      pitchBend: this.number(0), // in midi note number. Negative float is acceptable.
      timbre: this.number(0.5), // from 0.0 to 1.0.
      pressure: this.number(0.5), // from 0.0 to 1.0.
      selected: this.boolean(false)
    };
  }
}

export class Modulation extends Model {
  static entity = 'modulations';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      noteId: this.attr(null),
      type: this.string(MODULATION),
      offsetTime: this.number(1), // in tick
      pitchBend: this.number(null).nullable(), // in midi note number. Negative float is acceptable.
      pressure: this.number(null).nullable(), // from 0.0 to 1.0.
      timbre: this.number(null).nullable(), // from 0.0 to 1.0.
      selected: this.boolean(false)
    };
  }
}

export class NoteOff extends Model {
  static entity = 'noteOffs';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      noteId: this.attr(null),
      type: this.string(NOTE_OFF),
      offsetTime: this.number(1), // in tick
      noteOffVelocity: this.number(0),
      selected: this.boolean(false)
    };
  }
}

export class Note extends Model {
  static entity = 'notes';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      clipId: this.attr(null, makeMandatory('clipId')),
      noteOn: this.hasOne(NoteOn, 'noteId'),
      noteOff: this.hasOne(NoteOff, 'noteId'),
      modulations: this.hasMany(Modulation, 'noteId'),
      selected: this.boolean(false)
    };
  }
  get pitchTransition () {
    const pitchBendMods = this.modulations.filter(mod => mod.pitchBend !== null);
    const isEmpty = pitchBendMods.length === 0;
    const lastPitchBend = isEmpty ? this.noteOn.pitchBend : pitchBendMods[pitchBendMods.length - 1].pitchBend;
    return [
      {
        time: this.noteOn.time,
        pitch: this.noteOn.noteNumber + this.noteOn.pitchBend
      },
      ...pitchBendMods.map(modulation => ({
        time: this.noteOn.time + modulation.offsetTime,
        pitch: this.noteOn.noteNumber + modulation.pitchBend
      })),
      this.noteOff && {
        time: this.noteOn.time + this.noteOff.offsetTime,
        pitch: this.noteOn.noteNumber + lastPitchBend
      }
    ].filter(v => v);
  }
}

export class AudioBuffer extends Model {
  static entity = 'audioBuffers';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      buffer: this.attr(null),
      originalFilePath: this.string('')
    };
  }
}

export class Spectrogram extends Model {
  static entity = 'spectrograms';
  static fields () {
    return {
      clipId: this.attr(null),
      id: this.attr(null, makeMandatory('id')),
      times: this.attr([]),
      freqs: this.attr([]),
      magnitude2d: this.attr([[]])
    };
  }
}

export class MidiClip extends Model {
  static entity = 'clips';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      time: this.number(0),
      duration: this.number(ticksPerBeat * beatsInBar * 4),
      bgSpectrogram: this.hasOne(Spectrogram, 'clipId'),
      notes: this.hasMany(Note, 'clipId'),
      selected: this.boolean(false),
      trackId: this.attr(null)
    };
  };
}

export class Track extends Model {
  static entity = 'tracks';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      bpmTransition: this.attr([]),
      selected: this.boolean(false),
      songId: this.attr(null),
      clips: this.hasMany(MidiClip, 'trackId')
    };
  }
}

export class Song extends Model {
  static entity = 'songs';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      bpm: this.number(bpm),
      beatsInBar: this.number(beatsInBar),
      ticksPerBeat: this.number(ticksPerBeat),
      tracks: this.hasMany(Track, 'songId')
    };
  }
}

export class App extends Model {
  static entity = 'app';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      mouseMode: this.attr(SELECT)
    };
  }
}
