import store from '../../src/renderer/store';
import mockEntities from '../data/mockEntities';
import { Clip, NoteOff, NoteOn, Modulation, Note, Track } from '../../src/renderer/store/models';
import uid from 'uid';
import { SET_ENTITIES } from '../../src/renderer/store/mutation-types';

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
  test('gets pitch transition', () => {
    store.commit(SET_ENTITIES, mockEntities);
    const note = Note.query().withAll().last();
    expect(note.pitchTransition.length).not.toBe(0);
    note.pitchTransition.reduce((prev, current) => {
      expect(current.pitch).not.toBe(null);
      expect(prev.offsetTime <= current.offsetTime).toBe(true);
      return current;
    }, {
      pitch: -1,
      offsetTime: -1
    });
  });
});
