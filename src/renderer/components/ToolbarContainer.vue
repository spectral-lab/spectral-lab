<template>
    <div>
        <toolbar
                @mouse-mode="handleMouseMode"
                @extract-notes="extractNotes"
        />
    </div>
</template>

<script>
import Toolbar from './Toolbar';
import { Spectrogram, Song, Note, PianoRoll } from '../store/models';
import {
  makePNGBuffer, postImage,
  parsePointAsNoteOn, parsePointAsModulation, parsePointAsNoteOff
} from '../modules/helpers/postImageUtils';
import uid from 'uid';

export default {
  computed: {
    song () {
      return Song.query().last();
    },
    bpm () {
      return this.song.bpm;
    },
    ticksPerBeat () {
      return this.song.ticksPerBeat;
    },
    pianoRoll () {
      return PianoRoll.query().first();
    }
  },
  methods: {
    handleMouseMode (m) {
      PianoRoll.update({
        where: this.pianoRoll.id,
        data: {
          mouseMode: m
        }
      });
    },
    async extractNotes () {
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
    }
  },
  components: {
    Toolbar
  }
};
</script>
<style scoped>

</style>
