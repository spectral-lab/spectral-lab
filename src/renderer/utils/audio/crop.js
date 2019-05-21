/**
 * crop audio buffer into desired duration
 * @param  {AudioBuffer} sourceAudioBuffer
 * @param  {number} DESIRED_DURATION in second
 * @return {AudioBuffer}
 */
const crop = (sourceAudioBuffer, DESIRED_DURATION) => {
  if (sourceAudioBuffer.duration < DESIRED_DURATION) {
    return sourceAudioBuffer
  }
  const offlineCtx = new OfflineAudioContext(sourceAudioBuffer.numberOfChannels, sourceAudioBuffer.sampleRate * DESIRED_DURATION, sourceAudioBuffer.sampleRate)
  const targetBuffer = offlineCtx.createBuffer(sourceAudioBuffer.numberOfChannels, sourceAudioBuffer.sampleRate * DESIRED_DURATION, sourceAudioBuffer.sampleRate)
  for (let channel = 0; channel < sourceAudioBuffer.numberOfChannels; channel++) {
    targetBuffer.copyToChannel(sourceAudioBuffer.getChannelData(channel), channel)
  }
  return targetBuffer
}

export default crop
