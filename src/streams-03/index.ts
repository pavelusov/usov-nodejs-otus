import path from 'path';
import { fileGenerate, removeFile } from './helpers/fileGenerate';

const filePath = path.join(__dirname, '.', 'numbers');

async function main() {
  fileGenerate(filePath);
  removeFile(filePath);
}

main();