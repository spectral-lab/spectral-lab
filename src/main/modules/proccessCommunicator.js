class ProcessCommunicator {
  constructor () {
    this.windows = [];
  }

  appendWindow (win) {
    this.windows.push(win);
  }

  send (channel, ...args) {
    this.windows.forEach((win) => {
      win.webContents.send(channel, ...args);
    });
  }
}
export default new ProcessCommunicator();
