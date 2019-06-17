import { NOTE_COLOR } from '../../constants/colors';
import '../../typedef';

/**
 * @param  {object} param
 * @param  {Array.<Note>} param.notes
 * @param  {HTMLCanvasElement} param.canvas
 * @param  {function} param.timeToX
 * @param  {function} param.pitchToY
 * @param  {function} param.pitchTransition
 */
const renderPianoRoll = ({ notes, canvas, timeToX, pitchToY, pitchTransition }) => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const drawNoteOn = (noteOn) => {
    ctx.lineWidth = 1;
    ctx.fillStyle = NOTE_COLOR;
    const radius = noteOn.noteOnVelocity * 16;
    ctx.beginPath();
    ctx.arc(timeToX(noteOn.time), pitchToY(noteOn.noteNumber + noteOn.pitchBend), radius, 0, 2 * Math.PI);
    ctx.fill();
  };
  const drawPitchTransition = (transition) => {
    ctx.strokeStyle = NOTE_COLOR;
    ctx.lineWidth = 3;
    // Move to first point
    ctx.beginPath();
    ctx.moveTo(timeToX(transition[0].time), pitchToY(transition[0].pitch));
    // Draw points except first
    transition.slice(1).forEach((modulation, idx, arr) => {
      ctx.lineTo(timeToX(modulation.time), pitchToY(modulation.pitch));
      if (idx !== arr.length - 1) {
        ctx.moveTo(timeToX(modulation.time), pitchToY(modulation.pitch));
      };
    });
    ctx.stroke();
  };
  notes.forEach(note => {
    drawNoteOn(note.noteOn);
    drawPitchTransition(pitchTransition(note.id));
  });
};

export default renderPianoRoll;
