import path from 'path';

import {
  getMaxSizeMemory,
  fileGenerate,
  removeFile
} from './helpers';

const filePath = path.join(__dirname, '.', 'numbers');

export default function main(argv: string[]) {

  const maxSizeMemory = getMaxSizeMemory(argv);

  fileGenerate(filePath);
  // TODO maxSizeMemory
  removeFile(filePath);
}
