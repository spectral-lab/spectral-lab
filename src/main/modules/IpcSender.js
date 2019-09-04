export class IpcSender {
  constructor () {
    this.windows = [];
  }

  appendWindow (win) {
    this.windows.push(win);
  }

  send (channel, ...args) {
    this.windows.forEach((win) => {
      if (process.env.NODE_ENV === 'development') log(channel, ...args);
      win.webContents.send(channel, ...args);
    });
  }
}

const log = (channel, ...args) => {
  if (args.length === 0) console.log(`Send ${channel}`);
  else console.log(`send ${channel} with ${args}`);
};

export default new IpcSender();
