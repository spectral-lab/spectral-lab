
const defaults = {
  masterChannels: 1,
  memberChannels: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  pitchBendRange: 48
};

class outputManager {
  constructor (options) {
    this.options = Object.assign({}, defaults, options);
    this.channels = [];
  }
}

export default outputManager;
