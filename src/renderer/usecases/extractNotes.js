// @flow
import { Spectrogram, Note } from '../models';
import {
  makePNGBuffer,
  postImage
} from '../utils/helpers/postImageUtils';
import uid from 'uid';
import { parsePointAsModulation, parsePointAsNoteOff, parsePointAsNoteOn } from '../utils/helpers/parsePoint';
import { dialogEventHub } from '../modules/container';
import { EXTRACT_NOTES } from '../../constants/dialog-types';
import type { Degree, Sensitivity } from '../../types';

export const openExtractNotesDialog = () => {
  const spectrogram = Spectrogram.query().last();
  if (!spectrogram) return;
  if (spectrogram.times.length === 0) return;
  dialogEventHub.emit(null, { type: EXTRACT_NOTES });
};

export const extractNotes = async (options: { degree: Degree, sensitivity: Sensitivity }) => {
  const spectrogram = Spectrogram.query().last();
  if (!spectrogram) return;
  if (spectrogram.times.length === 0) return;
  const buff = makePNGBuffer(spectrogram.magnitude2d);
  const extractedLines = await postImage(buff, options);
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
