// @flow
import MemberChannel from './MemberChannel';
import { INoteControl, NoteControl } from './NoteControl';
import { outputManagerOptions } from '../../../constants/defaults';
import { NoteOn } from '../../store/models';
import type { Send, Now } from '../../../types';

type Options = {
  pitchBendRange?: number,
  nowCb?: Now,
  memberChannels?: number[],
  masterChannels?: number[]
}

export interface IOutputManager {
  noteOn (noteOn: NoteOn, timestamp?: number): INoteControl;
  send: Send | null;
}

export class OutputManager implements IOutputManager {
  _pitchBendRange: number;

  _now: Now;

  _memberChannels: MemberChannel[];

  send: Send | null;

  constructor (send?: Send, options?: Options = {}): void {
    this.send = send || null;
    const defaultedOptions = Object.assign({}, outputManagerOptions, options);
    this._pitchBendRange = defaultedOptions.pitchBendRange;
    this._now = defaultedOptions.nowCb;
    // TODO: Implement MasterChannel
    this._memberChannels = defaultedOptions.memberChannels
      .map(midiChannel => new MemberChannel({
        midiChannel,
        nowCb: this._now,
        pitchBendRange: this._pitchBendRange
      }));
  }

  /**
   * @param  {number} timestamp Either in tick
   */
  noteOn (noteOn: NoteOn, timestamp?: number): NoteControl {
    const channelToSend = this.allocateChannel();
    const midiMessages = channelToSend.noteOn(noteOn);
    if (timestamp) midiMessages.forEach(message => this.send && this.send(message, timestamp));
    if (!timestamp) midiMessages.forEach(message => this.send && this.send(message));
    return this.createNoteControl(channelToSend);
  }

  findMemberChannel (midiChannel: number): MemberChannel {
    const memberChannel = this._memberChannels.find(channel => channel.midiChannel === midiChannel);
    if (memberChannel) return memberChannel;
    return this._memberChannels[0];
  }

  set pitchBendRange (val: number) {
    this._memberChannels.forEach(channel => { channel.pitchBendRange = val; });
    this._pitchBendRange = val;
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

  createNoteControl (memberChannel: MemberChannel): NoteControl {
    const modulateCb = (modulation, timestamp = null) => {
      const midiMessages = memberChannel.modulate(modulation);
      if (!timestamp) return midiMessages.forEach(message => this.send && this.send(message));
      midiMessages.forEach(message => this.send && this.send(message, timestamp));
    };
    const noteOffCb = (noteOff, timestamp = null) => {
      const midiMessages = memberChannel.noteOff(noteOff);
      if (!timestamp) return midiMessages.forEach(message => this.send && this.send(message));
      midiMessages.forEach(message => this.send && this.send(message, timestamp));
    };
    return new NoteControl(modulateCb, noteOffCb);
  }
}

export default OutputManager;
