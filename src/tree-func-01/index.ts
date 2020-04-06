import { formatter } from './formatter';
import { INode, IElement } from './interfaces';

export { data } from './data';

const traverse = (element: INode, depth: number, queue: IElement[]) => {
  const el: IElement = {
    depth,
    name: element.name,
  };
  queue.push(el);

  if (element.items && element.items.length) {
    element.items.forEach(item => {
      traverse(item, depth + 1, queue);
    })
  }
};

export const showTree = (data: INode): void => {
  if (!data) return;

  const queue: IElement[] = [];
  traverse(data, 1, queue);

  queue.forEach(({ depth, name }, i, { length}) => {
    const isLast = (i === length - 1);
    console.info(formatter({ depth, name, isLast }));
  })
};
