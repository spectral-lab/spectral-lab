import fs from 'fs-extra';
import path from 'path';

const copyServerFiles = (dest) => {
  fs.ensureDirSync(dest);
  fs.copyFileSync(path.join(__static, '/server/app.py'), path.join(dest, 'app.py'));
  copyFolderRecursiveSync(path.join(__static, '/server/venv'), dest);
  copyFolderRecursiveSync(path.join(__static, '/server/modules'), dest);
};

export default copyServerFiles;

// Define subfunctions

const copyFileSync = (source, target) => {
  let targetFile = target;

  // if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
};

const copyFolderRecursiveSync = (source, target) => {
  let files = [];

  // check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
};
