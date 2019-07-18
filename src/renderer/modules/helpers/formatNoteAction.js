import * as noteActionTypes from '../../constants/model-types';
import { validateModulation, validateNoteOff } from './validateNoteAction';
import { pick } from 'lodash';
import * as modulationTypes from '../../constants/modulation-types';

const modulationProperties = ['type', 'offsetTime', ...Object.values(modulationTypes)];

export const formatModulation = ({ modulation, targetNote }) => {
  const _modulation = Object.assign({}, modulation);
  if (_modulation.offsetTime == null) {
    if (_modulation.time != null) {
      _modulation.offsetTime = _modulation.time - targetNote.noteOn.time;
    } else {
      throw new Error('Modulation has not been applied. Modulation must have `offsetTime` or `time` property.');
    }
  }
  if (_modulation.offsetTime < 0) {
    _modulation.offsetTime = 0;
  }
  if (_modulation.pitch != null && _modulation.pitchBend == null) {
    _modulation.pitchBend = _modulation.pitch - targetNote.noteOn.noteNumber;
  }
  _modulation.type = noteActionTypes.MODULATION;
  const ret = pick(_modulation, modulationProperties);
  validateModulation(ret);
  return ret;
};

export const formatNoteOff = ({ noteOff, targetNote }) => {
  const _noteOff = Object.assign({}, noteOff);
  if (_noteOff.offsetTime == null) {
    if (_noteOff.time != null) {
      _noteOff.offsetTime = _noteOff.time - targetNote.noteOn.time;
    } else {
      throw new Error('NOTE_OFF has not been applied. NOTE_OFF must have `offsetTime` or `time` property.');
    }
  }
  if (_noteOff.offsetTime < 0) {
    _noteOff.offsetTime = 0;
  }
  if (_noteOff.noteOffVelocity == null) {
    _noteOff.noteOffVelocity = 0;
  }
  _noteOff.type = noteActionTypes.NOTE_OFF;
  const ret = pick(_noteOff, ['type', 'offsetTime', 'noteOffVelocity']);
  validateNoteOff(ret);
  return ret;
};
