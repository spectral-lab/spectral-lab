import MemberChannel from './MemberChannel';

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
  /**
   * @param  {NoteOn | Modulation | NoteOff} noteAction
   */
  exec (noteAction, timestamp = 0) {
    const midiMessages = this.allocateChannel().deriveMidiMessages(noteAction, { pitchBendRange: this.pitchBendRange });
    midiMessages.forEach(message => this.midiOutput.send(message, timestamp));
  }
  allocateChannel () {
    const unoccupiedChannels = this.memberChannels.filter(memberChannel => !memberChannel.isOccupied());
    if (unoccupiedChannels.length === 0) {
      const channelWithOldestLastNoteOn = this.memberChannels
        .reduce((acc, memberChannel) => memberChannel.timeOfLastNoteOn < acc.timeOfLastNoteOn ? memberChannel : acc, this.memberChannels[0]);
      return channelWithOldestLastNoteOn;
    }
    const channelWithOldestLastNoteOff = unoccupiedChannels
      .reduce((acc, memberChannel) => memberChannel.timeOfLastNoteOff < acc.timeOfLastNoteOff ? memberChannel : acc, unoccupiedChannels[0]);
    return channelWithOldestLastNoteOff;
  }
  findMemberChannel (midiChannel) {
    return this.memberChannels.find(channel => channel.midiChannel === midiChannel);
  }
}

export default OutputManager;
