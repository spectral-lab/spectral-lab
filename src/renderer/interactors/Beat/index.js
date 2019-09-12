import uid from 'uid';

export const generateBeatData = (offsetTime: number): Object => ({
  id: uid(),
  offsetTime: offsetTime
});
