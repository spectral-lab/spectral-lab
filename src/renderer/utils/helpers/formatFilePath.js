import path from 'path';

export const formatFilePath = (filePath: string): string => {
  const { dir, root, name } = path.parse(filePath);
  return path.format({ dir, root, name, ext: '.slp' });
};
