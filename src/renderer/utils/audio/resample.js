/**
 * subfunction to resample audio buffer
 * @param  {AudioBuffer} sourceAudioBuffer
 * @param  {number} DESIRED_SAMPLE_RATE
 * @return {Promise.<Event>}
 */
const resample = (sourceAudioBuffer, DESIRED_SAMPLE_RATE) => {
  return new Promise((resolve) => {
    const offlineCtx = new OfflineAudioContext(sourceAudioBuffer.numberOfChannels, sourceAudioBuffer.duration * DESIRED_SAMPLE_RATE, DESIRED_SAMPLE_RATE)
    const cloneBuffer = offlineCtx.createBuffer(sourceAudioBuffer.numberOfChannels, sourceAudioBuffer.length, sourceAudioBuffer.sampleRate)
    // Copy the source data into the offline AudioBuffer
    for (let channel = 0; channel < sourceAudioBuffer.numberOfChannels; channel++) {
      cloneBuffer.copyToChannel(sourceAudioBuffer.getChannelData(channel), channel)
    }
    // Render it from the beginning.
    const source = offlineCtx.createBufferSource()
    source.buffer = cloneBuffer
    source.connect(offlineCtx.destination)
    offlineCtx.oncomplete = resolve
    offlineCtx.startRendering()
    source.start(0)
  })
}

export default resample
