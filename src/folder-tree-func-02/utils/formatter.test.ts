import { formatter, FormatterSymbols } from './formatter';
import { IFormatterProps } from "../interfaces";

describe('The "formatter" utility', () => {
  it('should return the formatted string if a depth value is 1', () => {
    let formatterProps: IFormatterProps = {
      depth: 1,
      name: 'root-folder',
      isLast: false
    };

    expect(formatter(formatterProps)).toBe('root-folder');
  });

  it('should return the formatted string if a depth value is 2', () => {
    let formatterProps: IFormatterProps = {
      depth: 2,
      name: 'folder-name',
      isLast: false
    };

    const template = `${FormatterSymbols.PARENT} folder-name`;

    expect(formatter(formatterProps)).toBe(template);
  });

  it('should return the formatted string if a depth value is 3', () => {
    let formatterProps: IFormatterProps = {
      depth: 3,
      name: 'folder-name',
      isLast: false
    };

    const template = `${FormatterSymbols.SPLIT} ${FormatterSymbols.PARENT} folder-name`;

    expect(formatter(formatterProps)).toBe(template);
  });

  it('should return the formatted string if a depth value is 4', () => {
    let formatterProps: IFormatterProps = {
      depth: 4,
      name: 'folder-name',
      isLast: false
    };

    const template = `${FormatterSymbols.SPLIT} ${FormatterSymbols.SPACE} ${FormatterSymbols.PARENT} folder-name`;

    expect(formatter(formatterProps)).toBe(template);
  });
});
