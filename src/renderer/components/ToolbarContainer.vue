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
import { App, Spectrogram, Song, Note } from '../store/models';
import { APP_ID } from '../constants/ids';
import {
  makePNGBuffer, postImage,
  parsePointAsNoteOn, parsePointAsModulation, parsePointAsNoteOff
} from '../modules/helpers/postImageUtils';
import uid from 'uid';

export default {
  computed: {
    bpm () {
      return Song.query().last().bpm;
    },
    ticksPerBeat () {
      return Song.query().last().ticksPerBeat;
    }
  },
  methods: {
    handleMouseMode (m) {
      App.update({
        where: APP_ID,
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
        const { note, noteOn } = parsePointAsNoteOn(line[0], spectrogram, this.secToTick);
        const modulations = line.slice(1, -1).map(point => {
          return parsePointAsModulation(point, spectrogram, this.secToTick, note.offsetTime, note.noteNumber);
        });
        const noteOff = parsePointAsNoteOff(line[line.length - 1], spectrogram, this.secToTick, note.offsetTime);
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
    },
    secToTick (sec) {
      return sec / 60 * this.bpm * this.ticksPerBeat;
    }
  },
  components: {
    Toolbar
  }
};
</script>
<style scoped>

</style>
