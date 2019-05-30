import { mean } from 'lodash';

/**
 * monauralize audio buffer which can have any number of channels
 * @param  {AudioBuffer} sourceAudioBuffer
 * @return {AudioBuffer}
 */
const sumToMono = (sourceAudioBuffer) => {
  const channelDataArray = [];
  for (let channel = 0; channel < sourceAudioBuffer.numberOfChannels; channel++) {
    channelDataArray.push(sourceAudioBuffer.getChannelData(channel));
  }
  const monauralizedChannelData = new Float32Array(sourceAudioBuffer.length);
  for (let i = 0; i < sourceAudioBuffer.length; i++) {
    const sampleFrame = channelDataArray.map((channelData) => channelData[i]);
    monauralizedChannelData[i] = mean(sampleFrame);
  }
  const offlineCtx = new OfflineAudioContext(1, sourceAudioBuffer.length, sourceAudioBuffer.sampleRate);
  const targetBuffer = offlineCtx.createBuffer(1, sourceAudioBuffer.length, sourceAudioBuffer.sampleRate);
  targetBuffer.copyToChannel(monauralizedChannelData, 0);
  return targetBuffer;
};

export default sumToMono;
