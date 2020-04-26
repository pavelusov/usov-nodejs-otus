import fs from 'fs';

export function getFileSize(path: string): number {
  const stats = fs.statSync(path);
  return stats.size;
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function numberGenerate(path: string): number {
  for(let i = 0; i < 10000; i++) {
    const data = getRandomInt(100000);
    fs.appendFileSync(path, `${data.toString()} `, { encoding: 'utf8'});
  }

  return getFileSize(path); // KB
}

export function fileGenerate(path: string, size: number): void {
  const MAX_FILE_SIZE_MB = size * 1000000;
  let fileSize = 0; // KB

  fs.writeFileSync(path, `${ getRandomInt(100000)} `, { encoding: 'utf-8'});
  console.info('Generating numbers... ');
  while (fileSize < MAX_FILE_SIZE_MB) {
    fileSize = numberGenerate(path);
  }
  console.log('Generation has finished. A file size: %s MB', fileSize)
}

export function removeFile(path: string) {
  fs.unlinkSync(path);
}