import { Modulation, Note, NoteOff, NoteOn } from '../../store/models';

export * from './noteShift';

export const deleteNotes = () => {
  Note.query().where('selected', true).withAll().get().forEach(note => {
    const { noteOn, noteOff, modulations, id } = note;
    Note.delete(id);
    NoteOn.delete(noteOn.id);
    NoteOff.delete(noteOff.id);
    modulations.forEach(mod => Modulation.delete(mod.id));
  });
};

export const selectAllNotes = () => {
  Note.update({
    where: _ => true,
    data: { selected: true }
  });
};
