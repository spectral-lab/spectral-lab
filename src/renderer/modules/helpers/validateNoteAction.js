export const validateModulation = (mod) => {
  if (mod.offsetTime != null && mod.type === 'MODULATION') {
    if (mod.pitchBend != null) return;
    if (mod.timbre != null) return;
    if (mod.pressure != null) return;
  };
  throw new Error('Invalid modulation');
};

export const validateNoteOff = (noteOff) => {
  if (
    noteOff.offsetTime != null &&
    noteOff.type === 'NOTE_OFF' &&
    noteOff.noteOffVelocity != null
  ) return;
  throw new Error('Invalid noteOff');
};
