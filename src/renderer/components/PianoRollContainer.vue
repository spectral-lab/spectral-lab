<template>
    <div ref="pianoRollContainer">
        <div v-for="noteOn in allNoteOns">{{noteOn.id}}</div>
    </div>
</template>

<script>
import { Note, NoteOn, NoteOff, MidiClip } from '../store/models';
import uid from 'uid';

export default {
  computed: {
    allNoteOns () {
      return NoteOn.query().withAll().get();
    },
    allNotes () {
      return Note.query().withAll().get();
    },
    allNoteOffs () {
      return NoteOff.query().withAll().get();
    },
    allNotesWithoutChildren () {
      return Note.query().get();
    },
    allPitchTransitions () {
      return Note.query().withAll().get().map(note => note.pitchTransition);
    }
  },
  async mounted () {
    // const clipId = uid();
    // await MidiClip.insert({
    //   data: {
    //     id: clipId
    //   }
    // });
    // this.editing = clipId;
    // setInterval(async () => {
    //   const noteOffId = uid();
    //   await NoteOff.insert({
    //     data: {
    //       id: noteOffId,
    //       offsetTime: 30,
    //       noteOffVelocity: 400
    //     } });
    //   const noteId = uid();
    //   await Note.insert({
    //     data: {
    //       id: noteId,
    //       clipId,
    //       noteOn: {
    //         id: uid(),
    //         noteNumber: 60,
    //         time: 30
    //       },
    //       modulations: [
    //         {
    //           id: uid(),
    //           offsetTime: 26,
    //           pitchBend: 11.5
    //         },
    //         {
    //           id: uid(),
    //           offsetTime: 28,
    //           pitchBend: 15.5
    //         },
    //         {
    //           id: uid(),
    //           offsetTime: 29,
    //           pressure: 0.67
    //         }
    //       ]
    //     }
    //   });
    //   await NoteOff.update({
    //     where: noteOffId,
    //     data: {
    //       noteId: noteId
    //     }
    //   });
    //   console.log(MidiClip.find(clipId).duration);
    // }, 1000);
  }
};
</script>


