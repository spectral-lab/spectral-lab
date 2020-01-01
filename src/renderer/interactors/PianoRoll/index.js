// @flow
import { PianoRoll } from '../../models';
import { APP_ID, PIANO_ROLL_ID } from '../../../constants/ids';

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

export const createPianoRoll = () => {
  PianoRoll.insert({
    data: {
      id: PIANO_ROLL_ID,
      appId: APP_ID
    }
  });
};

export const setIdOfNoteInEdit = async (val: string) => {
  await PianoRoll.update({
    where: PIANO_ROLL_ID,
    data: {
      idOfNoteInEdit: val
    }
  });
};
