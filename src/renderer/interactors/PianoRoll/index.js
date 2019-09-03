// @flow
import { PianoRoll } from '../../store/models';
import { PIANO_ROLL_ID } from '../../../constants/ids';

/**
 * from 0 to 1
 */
type Opacity = number;

export const setPianoRollOpacity = async (spectrogram: Opacity, grid: Opacity) => {
  await PianoRoll.update({
    where: PIANO_ROLL_ID,
    data: {
      spectrogramOpacity: spectrogram,
      gridOpacity: grid
    }
  });
};

export const setPianoRollOpacityWillChange = async (val: boolean) => {
  await PianoRoll.update({
    where: PIANO_ROLL_ID,
    data: {
      opacityWillChange: val
    }
  });
};

export const getPianoRollData = () => {
  return PianoRoll.query().whereId(PIANO_ROLL_ID).first();
};
