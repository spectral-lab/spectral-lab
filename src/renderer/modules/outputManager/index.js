import MemberChannel from './MemberChannel';
import NoteControl from './NoteControl';
import { outputManagerOptions } from '../../constants/defaults';
export class OutputManager {
  /**
   * @callback Send
   * @param  {array.<number>} message Array of midi message eg: [0x90, 63, 127]
   * @param  {number} timestamp Either ms or tick. Depends on the input timestamp of outputManager
   */
  /**
   * @param  {object} options
   * @param  {object} options.midiOutput
   * @param  {Send} options.midiOutput.send
   * @param  {number} [options.pitchBendRange]
   * @param  {function} [options.nowCb]
   * @param  {Array.<number>} [options.memberChannels]
   * @param  {Array.<number>} [options.masterChannels]
   */
  constructor (options) {
    const defaultedOptions = Object.assign({}, outputManagerOptions, options);
    this.pitchBendRange = defaultedOptions.pitchBendRange;
    this.now = defaultedOptions.nowCb;
    this.midiOutput = defaultedOptions.midiOutput;
    // TODO: Implement MasterChannel
    this.memberChannels = defaultedOptions.memberChannels
      .map(midiChannel => new MemberChannel({ midiChannel, nowCb: this.now }));
  }

  /**
   * @param  {NoteOn} noteOn
   * @param  {number} [timestamp] Either in tick or in ms
   * @return  {NoteControl} noteControl
   */
  noteOn (noteOn, timestamp = 0) {
    const channelToSend = this.allocateChannel();
    const midiMessages = channelToSend.deriveMidiMessages(noteOn, { pitchBendRange: this.pitchBendRange });
    midiMessages.forEach(message => this.midiOutput.send(message, timestamp));
    return this.createNoteControl(channelToSend);
  }

  allocateChannel () {
    const unoccupiedChannels = this.memberChannels.filter(memberChannel => !memberChannel.isOccupied);
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

  createNoteControl (memberChannel) {
    const modulateCb = (modulation, timestamp = 0) => {
      const midiMessages = memberChannel.deriveMidiMessages(modulation, { pitchBendRange: this.pitchBendRange });
      midiMessages.forEach(message => this.midiOutput.send(message, timestamp));
    };
    const noteOffCb = (noteOff, timestamp = 0) => {
      const midiMessages = memberChannel.deriveMidiMessages(noteOff, { pitchBendRange: this.pitchBendRange });
      midiMessages.forEach(message => this.midiOutput.send(message, timestamp));
    };
    return new NoteControl(modulateCb, noteOffCb);
  }
}

export default OutputManager;
