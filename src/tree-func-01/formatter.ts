import { IFormatterProps } from './interfaces';

export enum FormatterSymbols {
  PARENT = '└──',
  SPLIT = '│',
  SPACE = '  ',
}

export const formatter = ({ depth, name, isLast }: IFormatterProps): string => {
  let template = '';

  for (let i = 0; i < depth; i += 1) {
    if (i === 0) {
      template = name.toString();
      continue;
    }

    if (i === 1) {
      template = `${FormatterSymbols.PARENT} ${template}`;
      continue;
    }

    if (i == depth - 1 && !isLast) {
      template = `${FormatterSymbols.SPLIT} ${template}`;
      continue;
    }

    template = `${FormatterSymbols.SPACE} ${template}`;
  }

  return template;
};
