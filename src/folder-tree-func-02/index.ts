import path from 'path';

import {
  formatter,
  directoryWalker,
  getRootElement
} from "./utils";
import { IElement } from './interfaces';

export const directoryTreeView = (argv: string[]) => {
  const [ _, __, dirPath, depthArg, maxDepthArg ] = argv;

  try {
    if (dirPath) {
      const queue: IElement[] = [];
      const searchPath = /^\.+/.test(dirPath) ? path.join(__dirname, dirPath): dirPath;
      const rootElement: IElement = getRootElement(searchPath);
      const maxDepth = Number(maxDepthArg) + 1;
      queue.push(rootElement);

      directoryWalker({
        searchPath,
        depth: 2,
        maxDepth,
        depthArg,
        queue
      });

      queue.forEach(({ depth, name }, i, { length}) => {
        const isLast = (i === length - 1);
        console.info(formatter({ depth, name, isLast }));
      })
    }

  } catch (e) {
    console.error(e);
  }
};
