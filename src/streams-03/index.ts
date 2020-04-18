import path from 'path';
import fs from 'fs';

import {
  getMaxSizeMemory,
  fileGenerate,
  sortMerge,
} from './helpers';

const filePath = path.join(__dirname, '.', 'numbers');

interface ITempData {
  data: string;
  size: number;
  partFile: number;
}

export default function main(argv: string[]) {
  const MEMORY_BUFFER_DIVIDER = 2;
  const maxSizeMemory = getMaxSizeMemory(argv);
  fileGenerate(filePath, 1); // MB

  const reader = fs.createReadStream(filePath, { encoding: 'utf8' });
  const temp: ITempData = {
    data: '',
    size: 0,
    partFile: 1,
  };

  reader.on('data', (chunk) => {
    reader.pause();
    temp.data += chunk;
    temp.size += chunk.length;

    if (temp.size <= maxSizeMemory / MEMORY_BUFFER_DIVIDER) {
      reader.resume();
    } else {
      writePart(temp, reader);
    }
  });

  reader.on('end', () => {
    writePart(temp, reader);
  });

  reader.on('close', () => {
    const sortedFileDirPath = path.join(__dirname, '.', 'sortedArrays');

    fileMerge(sortedFileDirPath);
  });
}

function fileMerge(pathDir: string) {
  const SIDES = 2;
  let names = fs.readdirSync(pathDir);
  const lastDirName = names[names.length - 1];
  let matchedIndex = lastDirName.match(/\d+$/);
  let lastFileIndex = 0;

  if (matchedIndex) lastFileIndex = Number(matchedIndex[0]);

  const writer = fs.createWriteStream(path.join(pathDir, `result${++lastFileIndex}`));

  // Remove hidden files
  names = names.filter(name => !(/^\./.test(name)));
  if (names.length > SIDES) {
    const leftFileName = path.join(pathDir, names[0]);
    const rightFileName = path.join(pathDir, names[1]);
    let left: number[];
    let right: number[];


    for (let i = 0; i < SIDES; i++) {
      const fileName = path.join(pathDir, names[i]);
      const reader = fs.createReadStream(fileName, { encoding: 'utf8'});

      reader.on('data', (chunk => {
        reader.pause();

        if (i === 0) {
          left = chunk
            .toString()
            .split(',')
            .map(stringNumber => Number(stringNumber));
        } else {
          right = chunk
            .toString()
            .split(',')
            .map(stringNumber => Number(stringNumber));

          const leftLength = typeof left.length === 'undefined' ? 0 : left.length;
          const rightLength = typeof right.length === 'undefined' ? 0 : right.length;
          let l = 0;
          let r = 0;

          while (l < leftLength && r < rightLength) {
            const rightValue = right[r];
            const leftValue = left[l];
            if (rightValue > leftValue) {
              writer.write(writeValue(leftValue));
              l++;
            } else {
              writer.write(writeValue(rightValue));
              r++;
            }
          }

          while (l < leftLength) {
            const leftValue = left[l];
            writer.write(writeValue(leftValue));
            l++;
          }

          while (r < rightLength) {
            const rightValue = right[r];
            writer.write(writeValue(rightValue));
            r++;
          }

          // Remove those files
          fs.unlinkSync(leftFileName);
          fs.unlinkSync(rightFileName);
          writer.close();
          fileMerge(pathDir);
        }
      }))
    }
  }
}

function writeValue(value: number): string {
  return `${value},`;
}

function writePart(options: ITempData, reader: fs.ReadStream) {
  let { data } = options;
// SORT START
  data = data.replace(/undefined/g, '');
  let sortedNumberList = data
    .split(' ')
    .map(stringNumber => Number(stringNumber));

  sortedNumberList = sortMerge(sortedNumberList);
  // SORT END

  // WRITE SORTED FILE START
  writeDataSync('./sortedArrays', 'part', options.partFile++, sortedNumberList);
  // WRITE SORTED FILE END

  // Next file parts
  options.data = '';
  options.size = 0;
  reader.resume();
}

function createWriter(dirName: string, fileName: string, partFile: number): fs.WriteStream {
  const writerPath = path.join(__dirname, dirName, fileName + partFile);
  return fs.createWriteStream(writerPath);
}

function writeDataSync(dirName: string, fileName: string, partFile: number, data: any) {
  const writerPath = path.join(__dirname, dirName, fileName + partFile);
  return fs.writeFileSync(writerPath, data);
}
