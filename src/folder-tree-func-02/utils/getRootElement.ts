import { IElement } from '../interfaces';

export const getRootElement = (path: string): IElement => {
  const EMPTY_ELEMENT = '';
  let pathsList = path.split('/');
  pathsList = pathsList.filter(item => item !== EMPTY_ELEMENT);
  const lastElementIndex = pathsList.length - 1;
  return {
    name: pathsList[lastElementIndex],
    depth: 1
  };
};
