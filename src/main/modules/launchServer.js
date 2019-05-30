import { spawn, spawnSync } from 'child_process';
import path from 'path';
import { app } from 'electron';
import copyServerFiles from './copyServerFiles';

const launchServer = () => {
  return new Promise((resolve) => {
    const dest = path.join(app.getPath('userData'), '/server');
    copyServerFiles(dest);

    spawnSync('chmod', ['-R', 'a+rwx', path.join(dest, '/venv/bin/python3')]);
    const serverProcess = spawn(path.join(dest, '/venv/bin/python3'), [path.join(dest, '/app.py')]);
    serverProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    serverProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    serverProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    resolve(serverProcess);
  });
};

export default launchServer;
