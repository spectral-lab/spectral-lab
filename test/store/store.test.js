import { initStore } from '../../src/renderer/store';
import { Clip, NoteOff, AudioBuffer, Note, Track, PianoRoll } from '../../src/renderer/store/models';
import uid from 'uid';
import { flatten } from 'lodash';

beforeEach(() => {
  initStore();
});

describe('utils', () => {
  test('gets path', () => {
    const path = Clip.query().last().path;
    expect(path.length).toBe(3);
    expect(path[0].type).toBe('Song');
    expect(path[1].type).toBe('Track');
    expect(path[2].type).toBe('Clip');
  });
  test('gets absolute time', async (done) => {
    const noteOffId = uid();
    await Clip.update({
      where: Clip.query().last().id,
      data: {
        offsetTime: 1000
      }
    });
    await Note.insert({
      data: {
        id: uid(),
        clipId: Clip.query().last().id,
        offsetTime: 2000,
        noteOn: {
          id: uid(),
          noteNumber: 69
        },
        noteOff: {
          id: noteOffId,
          offsetTime: 4000
        }
      }
    });
    expect(Track.query().last().absoluteTime).toBe(0);
    expect(NoteOff.find(noteOffId).absoluteTime).toBe(7000);
    done();
  });
});

describe('Note model', () => {
  test('gets pitch transition', async (done) => {
    await Clip.insert({
      data: {
        id: uid(),
        notes: [
          {
            id: uid(),
            noteNumber: 60,
            noteOn: {
              id: uid(),
              pitchBend: -20
            },
            noteOff: {
              id: uid(),
              offsetTime: 40
            },
            modulations: [
              {
                id: uid(),
                offsetTime: 20,
                pitchBend: 3
              },
              {
                id: uid(),
                offsetTime: 30,
                pitchBend: 5
              }
            ]
          }
        ]
      }
    });
    const note = Note.query().withAllRecursive().last();
    expect(note.pitchTransition.length).not.toBe(0);
    note.pitchTransition.reduce((prev, current) => {
      expect(current.pitch).not.toBe(null);
      expect(prev.offsetTime <= current.offsetTime).toBe(true);
      return current;
    }, {
      pitch: -1,
      offsetTime: -1
    });
    done();
  });
});

describe('PianoRoll model', () => {
  test('gets clips', async (done) => {
    await Clip.insert({
      data: {
        id: uid()
      }
    });
    const pianoRoll = PianoRoll.query().last();
    expect(pianoRoll.clips.length).toBe(1);
    const newClipId = uid();
    await Clip.insert({
      data: {
        id: newClipId,
        selected: true
      }
    });
    expect(pianoRoll.clips.length).toBe(2);
    expect(pianoRoll.clips.map(clip => clip.id)).toContain(newClipId);
    await Clip.deleteAll();
    expect(pianoRoll.clips.length).toBe(0);
    done();
  });
  test('gets someNotesAreSelected', async (done) => {
    const pianoRoll = PianoRoll.query().last();
    const noteId = uid();
    const clipId = uid();
    await Clip.insert({
      data: {
        id: clipId,
        selected: true,
        notes: [
          {
            id: noteId,
            noteNumber: 60
          },
          {
            id: uid(),
            noteNumber: 60
          }
        ]
      }
    });
    expect(pianoRoll.someNotesAreSelected).toBe(false);
    await Note.update({
      where: noteId,
      data: {
        selected: true
      }
    });
    expect(pianoRoll.someNotesAreSelected).toBe(true);
    done();
  });
  test('gets audioBuffers when it has no clips', async (done) => {
    const pianoRoll = PianoRoll.query().last();
    await Clip.deleteAll();
    expect(Array.isArray(pianoRoll.audioBuffers)).toBe(true);
    expect(pianoRoll.audioBuffers.length).toBe(0);
    done();
  });
  test('gets spectrograms when it has no audioBuffers', async (done) => {
    const pianoRoll = PianoRoll.query().last();
    await AudioBuffer.deleteAll();
    expect(Array.isArray(pianoRoll.spectrograms)).toBe(true);
    expect(pianoRoll.spectrograms.length).toBe(0);
    done();
  });
});

describe('Clip model', () => {
  test('gets sorted note actions', async (done) => {
    await Clip.insert({
      data: {
        id: uid(),
        trackId: Track.query().first().id,
        notes: [
          {
            id: uid(),
            noteNumber: 60,
            offsetTime: 100,
            noteOn: {
              id: uid(),
              pitchBend: -20
            },
            noteOff: {
              id: uid(),
              offsetTime: 40
            },
            modulations: [
              {
                id: uid(),
                offsetTime: 60,
                pitchBend: 3
              },
              {
                id: uid(),
                offsetTime: 30,
                pitchBend: 5
              }
            ]
          }
        ]
      }
    });
    const clip = Clip.query().withAllRecursive().last();
    expect(clip.sortedNoteActions.length).not.toBe(0);
    const originalNoteActions = flatten(clip.notes.map(note => [note.noteOn, ...note.modulations, note.noteOff]));
    expect(() => {
      expectToBeSorted(originalNoteActions);
    }).toThrow();
    expectToBeSorted(clip.sortedNoteActions);
    done();
  });
});

const expectToBeSorted = arr => {
  arr.reduce((prev, current) => {
    expect(prev.absoluteTime <= current.absoluteTime).toBe(true);
    return current;
  }, {
    absoluteTime: -1
  });
};
