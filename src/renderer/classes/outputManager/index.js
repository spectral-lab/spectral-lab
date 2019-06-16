import MemberChannel from './MemberChannel';

const defaults = {
  masterChannels: [1],
  memberChannels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  pitchBendRange: 48,
  nowCb: performance.now,
  midiOutput: { output: console.log }
};

class OutputManager {
  /**
   * @param  {object} options
   * @param  {object} options.midiOutput
   * @param  {number} options.pitchBendRange
   * @param  {function} options.nowCb
   * @param  {Array.<number>} options.memberChannels
   * @param  {Array.<number>} options.masterChannels
   */
  constructor (options) {
    this.pitchBendRange = options.pitchBendRange;
    this.now = options.nowCb;
    this.midiOutput = options.midiOutput;
    // TODO: Implement MasterChannel
    this.memberChannels = options.memberChannels
      .map(midiChannel => new MemberChannel({ midiChannel, nowCb: this.now }));
  }
  allocateChannel () {
    const unoccupiedChannels = this.memberChannels.filter(memberChannel => !memberChannel.isOccupied());
    if (unoccupiedChannels.length === 0) {
      const channelWithOldestLastNoteOn = unoccupiedChannels
        .reduce((acc, memberChannel) => memberChannel.timeOfLastNoteOn < acc.timeOfLastNoteOn ? memberChannel : acc, unoccupiedChannels[0]);
      return channelWithOldestLastNoteOn;
    }
    const channelWithOldestLastNoteOff = unoccupiedChannels
      .reduce((acc, memberChannel) => memberChannel.timeOfLastNoteOff < acc.timeOfLastNoteOff ? memberChannel : acc, unoccupiedChannels[0]);
    return channelWithOldestLastNoteOff;
  }
}

export default OutputManager;
