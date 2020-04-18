import path from 'path';
import fs from 'fs';

import {
  getMaxSizeMemory,
  fileGenerate,
  sortMerge
} from './helpers';

const filePath = path.join(__dirname, '.', 'numbers');


export default function main(argv: string[]) {
  const MEMORY_BUFFER_DIVIDER = 2;
  const maxSizeMemory = getMaxSizeMemory(argv);
  fileGenerate(filePath, 1); // MB

  const reader = fs.createReadStream(filePath, { encoding: 'utf8' });
  let partFile = 1;
  let data: string;
  let size = 0; // KB

  reader.on('data', (chunk) => {
    reader.pause();

    data += chunk;
    size += chunk.length;

    if (size <= maxSizeMemory / MEMORY_BUFFER_DIVIDER) {
      reader.resume();
    } else {
      // SORT START
      data = data.replace(/undefined/g, '');

      let sortedNumberList = data
        .split(' ')
        .map(stringNumber => Number(stringNumber));

      sortedNumberList = sortMerge(sortedNumberList);
      // SORT END

      // WRITE SORTED FILE START
      writeDataSync('./sortedArrays', 'part', partFile++, sortedNumberList);
      // WRITE SORTED FILE END

      // Next file parts
      data = '';
      size = 0;
      reader.resume();
    }
  });

  reader.on('end', reader.close);
}

function createWriter(dirName: string, fileName: string, partFile: number): fs.WriteStream {
  const writerPath = path.join(__dirname, dirName, fileName + partFile);
  return fs.createWriteStream(writerPath);
}

function writeDataSync(dirName: string, fileName: string, partFile: number, data: any) {
  const writerPath = path.join(__dirname, dirName, fileName + partFile);
  return fs.writeFileSync(writerPath, data);
}
