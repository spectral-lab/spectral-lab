import { BrowserWindow, screen } from 'electron';

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

export default () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  /**
   * Initial window options
   */
  const mainWindow = new BrowserWindow({
    width,
    height,
    useContentSize: false,
    titleBarStyle: 'hidden'
  });
  mainWindow.loadURL(winURL);
  return mainWindow;
};
