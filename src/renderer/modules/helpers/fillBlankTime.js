import { cloneDeep } from 'lodash';

const fillBlankTime = (originalLines) => {
  const lines = cloneDeep(originalLines);
  lines.sort((a, b) => a.startTimeIdx - b.startTimeIdx);
  for (let i = 0; i < lines.length - 1; i = i + 1) {
    for (let j = i + 1; j < lines.length;) {
      if (lines[i].endTimeIdx < lines[j].startTimeIdx) {
        lines[i].endTimeIdx = lines[j].endTimeIdx;
        lines[i].points.push(...lines[j].points);
        lines[i].numberOfPoints += lines[j].numberOfPoints;
        lines.splice(j, 1);
      } else {
        j = j + 1;
      }
    }
  }
  return lines;
};

export default fillBlankTime;
