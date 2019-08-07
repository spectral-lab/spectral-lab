export const NEW_PROJECT = 'New Project';
export const OPEN_PROJECT = 'Open Project';
export const SAVE_PROJECT = 'Save Project';
export const EXPORT_MIDI = 'Export MIDI';
export const EXPORT_AUDIO = 'Export Audio';
export const UNDO = 'Undo';
export const REDO = 'Redo';

export default [
  {
    label: 'File',
    subMenu: [
      NEW_PROJECT,
      OPEN_PROJECT,
      SAVE_PROJECT,
      EXPORT_MIDI,
      EXPORT_AUDIO
    ]
  },
  {
    label: 'Edit',
    subMenu: [
      UNDO,
      REDO
    ]
  }
];
