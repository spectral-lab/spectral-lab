import store from '../../src/renderer/store';
import mockEntities from '../data/mockEntities';
import { Clip, NoteOff, NoteOn, Modulation, Note } from '../../src/renderer/store/models';
import { getAbsoluteTime, getPath } from '../../src/renderer/store/utils';
import uid from 'uid';
import { SET_ENTITIES } from '../../src/renderer/store/mutation-types';

describe('utils', () => {
  test('gets path', () => {
    const path = getPath(Clip.query().last());
    expect(path.length).toBe(3);
    expect(path[0].type).toBe('SONG');
    expect(path[1].type).toBe('TRACK');
    expect(path[2].type).toBe('CLIP');
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
    const time = getAbsoluteTime(NoteOff.find(noteOffId));
    expect(time).toBe(7000);
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
      expect(prev.time).toBeLessThan(current.time);
      return current;
    }, {
      pitch: -1,
      time: -1
    });
  });
});
