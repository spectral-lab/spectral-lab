export default {
  pitchTransition: state => id => {
    const note = state.data.find(n => n.id === id);
    const pitchBendTransition = note.modulations.filter(mod => mod.hasOwnProperty('pitchBend'))
      .map(mod => {
        return {
          time: note.noteOn.time + mod.offsetTime,
          pitch: note.noteOn.noteNumber + mod.pitchBend
        };
      });
    return [
      {
        time: note.noteOn.time,
        pitch: note.noteOn.noteNumber + note.noteOn.pitchBend
      },
      ...pitchBendTransition
    ];
  },
  getNoteById: state => id => {
    return state.data.find(n => n.id === id);
  },
  notes: state => state.data
};
