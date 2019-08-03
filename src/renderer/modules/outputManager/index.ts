import MemberChannel from './MemberChannel';
import NoteControl from './NoteControl';
import { outputManagerOptions } from '../../constants/defaults';
// eslint-disable-next-line no-unused-vars
import { NoteOn } from '../../store/models';
// eslint-disable-next-line no-unused-vars
import { Send, Now } from '../../typedef';

interface Options {
  send?: Send;
  pitchBendRange?: number;
  nowCb?: Now;
  memberChannels?: number[];
  masterChannels?: number[];
}

export class OutputManager {
  private _pitchBendRange: number;

  private _now: Now;

  private _send: Send;

  private _memberChannels: MemberChannel[];

  constructor (options: Options | undefined) {
    const defaultedOptions = Object.assign({}, outputManagerOptions, options);
    this._pitchBendRange = defaultedOptions.pitchBendRange;
    this._now = defaultedOptions.nowCb;
    this._send = defaultedOptions.send;
    // TODO: Implement MasterChannel
    this._memberChannels = defaultedOptions.memberChannels
      .map(midiChannel => new MemberChannel({ midiChannel, nowCb: this._now }));
  }

  /**
   * @param  {number} timestamp Either in tick
   */
  noteOn (noteOn: NoteOn, timestamp: number = 0): NoteControl {
    const channelToSend = this.allocateChannel();
    const midiMessages = channelToSend.deriveMidiMessages(noteOn, { pitchBendRange: this._pitchBendRange });
    midiMessages.forEach(message => this._send(message, timestamp));
    return this.createNoteControl(channelToSend);
  }

  allocateChannel (): MemberChannel {
    const unoccupiedChannels = this._memberChannels.filter(memberChannel => !memberChannel.isOccupied);
    if (unoccupiedChannels.length === 0) {
      const channelWithOldestLastNoteOn = this._memberChannels
        .reduce((acc, memberChannel: MemberChannel) => memberChannel.timeOfLastNoteOn < acc.timeOfLastNoteOn ? memberChannel : acc, this._memberChannels[0]);
      return channelWithOldestLastNoteOn;
    }
    const channelWithOldestLastNoteOff = unoccupiedChannels
      .reduce((acc, memberChannel) => memberChannel.timeOfLastNoteOff < acc.timeOfLastNoteOff ? memberChannel : acc, unoccupiedChannels[0]);
    return channelWithOldestLastNoteOff;
  }

  findMemberChannel (midiChannel: number): MemberChannel {
    const memberChannel = this._memberChannels.find(channel => channel.midiChannel === midiChannel);
    if (memberChannel) return memberChannel;
    return this._memberChannels[0];
  }

  createNoteControl (memberChannel: MemberChannel): NoteControl {
    const modulateCb = (modulation, timestamp = 0) => {
      const midiMessages = memberChannel.deriveMidiMessages(modulation, { pitchBendRange: this._pitchBendRange });
      midiMessages.forEach(message => this._send(message, timestamp));
    };
    const noteOffCb = (noteOff, timestamp = 0) => {
      const midiMessages = memberChannel.deriveMidiMessages(noteOff, { pitchBendRange: this._pitchBendRange });
      midiMessages.forEach(message => this._send(message, timestamp));
    };
    return new NoteControl(modulateCb, noteOffCb);
  }
}

export default OutputManager;
