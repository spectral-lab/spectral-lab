import SVG from 'svg.js';
import * as teoria from 'teoria';
import elementResizeDetector from 'element-resize-detector';
import { range } from 'lodash';

export const drawMidiKeyboard = wrapper => {
  const draw = SVG(wrapper).size(100, 1280).attr({ preserveAspectRatio: 'none' });
  draw.viewbox(0, 0, 100, 1280);
  draw.rect(100, 1280).attr({ fill: 'rgb(24,24,24)' });
  drawBlackKeys(draw);
  listenWrapperResize(wrapper, draw);
};

const listenWrapperResize = (wrapper, draw) => {
  const detector = elementResizeDetector({ strategy: 'scroll' });
  detector.listenTo(wrapper, () => {
    draw.height('100%');
  });
};

const drawBlackKeys = (draw) => {
  range(128).forEach(noteNumber => {
    const accidental = teoria.note.fromMIDI(noteNumber).accidental();
    switch (accidental) {
      case '#':
        drawBlackKey(noteNumber, draw);
        break;
      case 'b':
        drawBlackKey(noteNumber, draw);
        break;
    }
  });
};

const drawBlackKey = (noteNumber, draw) => {
  const centerY = (127 - noteNumber) * 10 + 5;
  draw.rect(40, 4).radius(10, 2).attr({ fill: 'rgb(80,80,80)' }).y(centerY - 2);
};
