import { Model } from '@vuex-orm/core';
import {
  NOTE_ON, NOTE_OFF, MODULATION,
  NOTE, SPECTROGRAM, AUDIO_BUFFER, CLIP,
  TRACK, SONG, APP
} from '../constants/model-types';
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
      type: this.string(NOTE),
      clipId: this.attr(null, makeMandatory('clipId')),
      noteOn: this.hasOne(NoteOn, 'noteId'),
      noteOff: this.hasOne(NoteOff, 'noteId'),
      modulations: this.hasMany(Modulation, 'noteId'),
      offsetTime: this.number(0), // in tick
      selected: this.boolean(false)
    };
  }
  get pitchTransition () {
    const pitchBendMods = this.modulations.filter(mod => mod.pitchBend !== null);
    const isEmpty = pitchBendMods.length === 0;
    const lastPitchBend = isEmpty ? this.noteOn.pitchBend : pitchBendMods[pitchBendMods.length - 1].pitchBend;
    return [
      {
        time: this.offsetTime,
        pitch: this.noteOn.noteNumber + this.noteOn.pitchBend
      },
      ...pitchBendMods.map(modulation => ({
        time: this.offsetTime + modulation.offsetTime,
        pitch: this.noteOn.noteNumber + modulation.pitchBend
      })),
      this.noteOff && {
        time: this.offsetTime + this.noteOff.offsetTime,
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
      type: this.string(AUDIO_BUFFER),
      clipId: this.attr(null, makeMandatory('clipId')),
      offsetTime: this.number(0),
      data: this.attr(null),
      originalFilePath: this.string(''),
      spectrogram: this.hasOne(Spectrogram, 'audioBufferId')
    };
  }
}

export class Spectrogram extends Model {
  static entity = 'spectrograms';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(SPECTROGRAM),
      audioBufferId: this.attr(null),
      times: this.attr([]),
      freqs: this.attr([]),
      magnitude2d: this.attr([[]])
    };
  }
}

export class Clip extends Model {
  static entity = 'clips';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(CLIP),
      offsetTime: this.number(0), // in tick
      duration: this.number(4 * beatsInBar * ticksPerBeat), // 4 bars
      notes: this.hasMany(Note, 'clipId'),
      audioBuffer: this.hasOne(AudioBuffer, 'clipId'),
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
      type: this.string(TRACK),
      bpmTransition: this.attr([]),
      beatsInBarTransition: this.attr([]),
      selected: this.boolean(false),
      songId: this.attr(null),
      clips: this.hasMany(Clip, 'trackId')
    };
  }
}

export class Song extends Model {
  static entity = 'songs';
  static fields () {
    return {
      id: this.attr(null, makeMandatory('id')),
      type: this.string(SONG),
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
      type: this.string(APP),
      mouseMode: this.attr(SELECT)
    };
  }
}
