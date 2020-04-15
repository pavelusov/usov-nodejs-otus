import fs from 'fs';

function getFileSize(path: string): number {
  const stats = fs.statSync(path);
  const fileSizeInBytes = stats.size;
  const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
  return fileSizeInMegabytes;
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function numberGenerate(path: string): number {
  for(let i = 0; i < 10000; i++) {
    const data = getRandomInt(100000);
    fs.appendFileSync(path, `${data.toString()} `, { encoding: 'utf-8'});
  }

  return getFileSize(path);
}

export function fileGenerate(path: string): void {
  const MAX_FILE_SIZE_MB = 100;
  let fileSize = 0;

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