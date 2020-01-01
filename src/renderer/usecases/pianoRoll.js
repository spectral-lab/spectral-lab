import { setIdOfNoteInEdit } from '../interactors/PianoRoll';
import { Note } from '../store/models';

export const deselectNotes = () => {
  setIdOfNoteInEdit(null);
  Note.update({
    where: note => note.selected,
    data: {
      selected: false
    }
  });
};

export const selectSingleNote = (id) => {
  setIdOfNoteInEdit(null);
  Note.update({
    where: note => note.selected && note.id !== id,
    data: {
      selected: false
    }
  });
  Note.update({
    where: id,
    data: {
      selected: true
    }
  });
};

export const addNoteToSelection = (id) => {
  setIdOfNoteInEdit(null);
  Note.update({
    where: id,
    data: {
      selected: true
    }
  });
};
