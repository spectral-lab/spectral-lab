import { Modulation, Note, NoteOff, NoteOn } from '../../store/models';

export * from './noteShift';

export const deleteNotes = async () => {
  const notes = Note.query().where('selected', true).withAll().get();
  await Promise.all(notes.map(async (note) => {
    const { noteOn, noteOff, modulations, id } = note;
    await Promise.all([
      Note.delete(id),
      NoteOn.delete(noteOn.id),
      NoteOff.delete(noteOff.id),
      modulations.forEach(mod => Modulation.delete(mod.id))
    ]);
  }));
};

export const selectAllNotes = async () => {
  await Note.update({
    where: _ => true,
    data: { selected: true }
  });
};
