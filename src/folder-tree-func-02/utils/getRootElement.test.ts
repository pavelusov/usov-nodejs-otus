import { getRootElement } from './index';
import { IElement } from '../interfaces';

describe('The "getRootElement" utility', () => {
  let rootElementName: IElement;

  beforeEach(() => {
    rootElementName = getRootElement('/path/to/rootName/');
  });

  it('should return a root element name', () => {
    expect(rootElementName.name).toBe('rootName');
  });

  it('should return a depth value', () => {
    expect(rootElementName.depth).toBe(1);
  });
});
