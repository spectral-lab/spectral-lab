/**
 * normalize gain of audio buffer
 * @param  {AudioBuffer} sourceAudioBuffer
 * @return {AudioBuffer}
*/
const normalize = (sourceAudioBuffer) => {
  let max = 0
  for (let channel = 0; channel < sourceAudioBuffer.numberOfChannels; channel++) {
    const channelData = sourceAudioBuffer.getChannelData(channel)
    for (let i = 0; i < channelData.length; i++) {
      max = Math.max(Math.abs(channelData[i]), max)
    }
  }

  const ratio = max === 0 ? 1 : 1 / max

  const normalizedChannelDataArray = []

  for (let channel = 0; channel < sourceAudioBuffer.numberOfChannels; channel++) {
    const channelData = sourceAudioBuffer.getChannelData(channel)
    const normalizedChannelData = new Float32Array(sourceAudioBuffer.length)
    for (let i = 0; i < channelData.length; i++) {
      normalizedChannelData[i] = channelData[i] * ratio
    }
    normalizedChannelDataArray.push(normalizedChannelData)
  }

  const offlineCtx = new OfflineAudioContext(sourceAudioBuffer.numberOfChannels, sourceAudioBuffer.length, sourceAudioBuffer.sampleRate)
  const targetBuffer = offlineCtx.createBuffer(sourceAudioBuffer.numberOfChannels, sourceAudioBuffer.length, sourceAudioBuffer.sampleRate)

  for (let channel = 0; channel < sourceAudioBuffer.numberOfChannels; channel++) {
    targetBuffer.copyToChannel(normalizedChannelDataArray[channel], channel)
  }

  return targetBuffer
}

export default normalize
