import { IElement, IWalkerOptions } from '../interfaces';
import fs from 'fs';
import path from 'path';

export const directoryWalker = ({
 searchPath,
 depth,
 maxDepth,
 queue,
 depthArg
}: IWalkerOptions) => {
  const hasDepthArg = (depthArg === '-d') || (depthArg === '--depth');

  if (hasDepthArg && depth > maxDepth) return;

  const list = fs.readdirSync(searchPath, { withFileTypes: true });

  list.forEach(item => {
    const isDirectory = item.isDirectory();
    const { name } = item;

    const element: IElement = {
      depth,
      name,
    };

    if (isDirectory) {
      queue.push(element);
      const directoryPath = path.join(searchPath, name);
      const nextDepth = depth + 1;
      directoryWalker({
        searchPath: directoryPath,
        depth: nextDepth,
        maxDepth,
        depthArg,
        queue
      });
    } else {
      queue.push(element);
    }
  });
};
