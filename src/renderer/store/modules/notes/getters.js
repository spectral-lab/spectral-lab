const processNoteOn = noteOn => ({
  time: noteOn.time,
  pitch: noteOn.noteNumber + noteOn.pitchBend
});

const processModulations = (modulations, noteOn) =>
  modulations
    .filter(mod => mod.hasOwnProperty('pitchBend'))
    .map(mod => {
      return {
        time: noteOn.time + mod.offsetTime,
        pitch: noteOn.noteNumber + mod.pitchBend
      };
    });

const processNoteOff = (noteOff, noteOn, lastPitch) => ({
  time: noteOn.time + noteOff.offsetTime,
  pitch: lastPitch
});

export default {
  pitchTransition: state => id => {
    const note = state.data.find(n => n.id === id);
    if (note == null) throw new Error(`Could not find note with id ${id}`);
    const transition = [];
    transition.push(processNoteOn(note.noteOn));
    if (note.modulations.length > 0) {
      transition.push(...processModulations(note.modulations, note.noteOn));
    }
    if (note.noteOff) {
      const lastPitch = transition[transition.length - 1].pitch;
      transition.push(processNoteOff(note.noteOff, note.noteOn, lastPitch));
    };
    return transition;
  },
  getNoteById: state => id => {
    return state.data.find(n => n.id === id);
  },
  notes: state => state.data
};
