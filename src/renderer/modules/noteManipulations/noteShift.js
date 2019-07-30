import { Note } from '../../store/models';

export const noteShiftLeft = (ticks) => {
  Note.query().where('selected', true).get().forEach(note => {
    Note.update({
      where: note.id,
      data: {
        offsetTime: note.offsetTime - ticks
      }
    });
  });
};

export const noteShiftRight = (ticks) => {
  Note.query().where('selected', true).get().forEach(note => {
    Note.update({
      where: note.id,
      data: {
        offsetTime: note.offsetTime + ticks
      }
    });
  });
};

export const noteShiftUp = (noteNumber) => {
  Note.query().where('selected', true).get().forEach(note => {
    Note.update({
      where: note.id,
      data: {
        noteNumber: note.noteNumber + noteNumber
      }
    });
  });
};

export const noteShiftDown = (noteNumber) => {
  Note.query().where('selected', true).get().forEach(note => {
    Note.update({
      where: note.id,
      data: {
        noteNumber: note.noteNumber - noteNumber
      }
    });
  });
};
