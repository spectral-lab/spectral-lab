import { Spectrogram, Note } from '../models';
import {
  makePNGBuffer,
  parsePointAsModulation,
  parsePointAsNoteOff,
  parsePointAsNoteOn, postImage
} from '../utils/helpers/postImageUtils';
import uid from 'uid';

export const extractNotes = async () => {
  const spectrogram = Spectrogram.query().last();
  if (!spectrogram) return;
  if (spectrogram.times.length === 0) return;
  const buff = makePNGBuffer(spectrogram.magnitude2d);
  const extractedLines = await postImage(buff, { sensitivity: 5, degree: 6 });
  extractedLines.forEach((line) => {
    const { note, noteOn } = parsePointAsNoteOn(line[0], spectrogram);
    const modulations = line.slice(1, -1).map(point => {
      return parsePointAsModulation(point, spectrogram, note.offsetTime, note.noteNumber);
    });
    const noteOff = parsePointAsNoteOff(line[line.length - 1], spectrogram, note.offsetTime, note.noteNumber);
    Note.insert({
      data: {
        id: uid(),
        clipId: spectrogram.parent.clipId,
        offsetTime: note.offsetTime,
        noteNumber: note.noteNumber,
        noteOn,
        noteOff,
        modulations
      }
    });
  });
};
