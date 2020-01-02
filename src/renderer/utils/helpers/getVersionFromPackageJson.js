import * as fs from 'fs-extra';
import * as path from 'path';

export const getVersionFromPackageJson = (): string => {
  try {
    return fs.readJsonSync('./package.json').version;
  } catch {
    return fs.readJsonSync(path.join(__static, '/package.json')).version;
  }
};
