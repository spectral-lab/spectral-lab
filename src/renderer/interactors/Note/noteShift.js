import { Note } from '../../models';

export const noteShiftLeft = async (ticks) => {
  const notes = Note.query().where('selected', true).get();
  await Promise.all(notes.map(async (note) => {
    await Note.update({
      where: note.id,
      data: {
        offsetTime: note.offsetTime - ticks
      }
    });
  }));
};

export const noteShiftRight = async (ticks) => {
  const notes = Note.query().where('selected', true).get();
  await Promise.all(notes.map(async (note) => {
    await Note.update({
      where: note.id,
      data: {
        offsetTime: note.offsetTime + ticks
      }
    });
  }));
};

export const noteShiftUp = async (noteNumber) => {
  const notes = Note.query().where('selected', true).get();
  await Promise.all(notes.map(async (note) => {
    await Note.update({
      where: note.id,
      data: {
        noteNumber: note.noteNumber + noteNumber
      }
    });
  }));
};

export const noteShiftDown = async (noteNumber) => {
  const notes = Note.query().where('selected', true).get();
  await Promise.all(notes.map(async (note) => {
    await Note.update({
      where: note.id,
      data: {
        noteNumber: note.noteNumber - noteNumber
      }
    });
  }));
};
